terraform {
  required_providers {
    dotenv = {
      source  = "jrhouston/dotenv"
      version = "~> 1.0"
    }
    google = {
      source  = "hashicorp/google"
      version = ">= 4.34.0"
    }
  }
}

data dotenv dev {
  filename = "dev.env"
}

locals {
  project_id     = "discord-programing-event-bot"
  project_region = "asia-northeast1"
  project_zone   = "a"
}

provider "google" {
  credentials = file(data.dotenv.dev.env.GCP_SERVICE_ACCOUNT_KEY_PATH)
  project     = local.project_id
  region      = local.project_region
  zone        = local.project_zone
}

resource "random_id" "bucket_prefix" {
  byte_length = 8
}

resource "google_pubsub_topic" "default" {
  name = "functions2-topic"
}

resource "google_storage_bucket" "default" {
  name                        = "${random_id.bucket_prefix.hex}-gcf-source" # Every bucket name must be globally unique
  location                    = local.project_region
  uniform_bucket_level_access = true
}

data "archive_file" "default" {
  type        = "zip"
  output_path = "/tmp/function-source.zip"
  source_dir  = "."
}

resource "google_storage_bucket_object" "default" {
  provisioner "local-exec" {
    command = "npm run build"
  }

  name   = "function-source.zip"
  bucket = google_storage_bucket.default.name
  source = data.archive_file.default.output_path # Path to the zipped function source code
}

resource "google_cloudfunctions2_function" "discord-programing-event-bot" {
  name        = "discord-programing-event-bot"
  location    = local.project_region
  description = "post new events to discord"

  build_config {
    runtime     = "nodejs20"
    entry_point = "everyHourDaytime" # Set the entry point
    environment_variables = {
      BUILD_CONFIG_TEST = "build_test"
    }
    source {
      storage_source {
        bucket = google_storage_bucket.default.name
        object = google_storage_bucket_object.default.name
      }
    }
  }

  service_config {
    max_instance_count = 1
    min_instance_count = 1
    available_memory   = "256M"
    timeout_seconds    = 60
    environment_variables = {
      SERVICE_CONFIG_TEST = "config_test"
    }
    ingress_settings               = "ALLOW_INTERNAL_ONLY"
    all_traffic_on_latest_revision = true

    secret_environment_variables {
      version = "latest"
      key = "DISCORD_TOKEN"
      secret = data.dotenv.dev.env.DISCORD_TOKEN
      project_id = local.project_id
    }
  }

  event_trigger {
    trigger_region = local.project_region
    event_type     = "google.cloud.pubsub.topic.v1.messagePublished"
    pubsub_topic   = google_pubsub_topic.default.id
    retry_policy   = "RETRY_POLICY_RETRY"
  }
}

resource "google_cloud_scheduler_job" "discord-programing-event-bot-scheduler" {
  name        = "discord-programing-event-bot-scheduler"
  description = "every hour of daytime"
  schedule    = "0 9-21 * * *"
  time_zone   = "Asia/Tokyo"

  pubsub_target {
    topic_name = google_pubsub_topic.default.id
    data       = base64encode("run!")
  }
}
