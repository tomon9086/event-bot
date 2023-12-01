# event-bot

プログラミング系のイベント情報をDiscordに投稿するbot

## setup

edit `.env` and set `GCP_SERVICE_ACCOUNT_KEY_PATH`

## Deploy

```bash
terraform init
terraform plan  # optional
terraform apply
```

## Clean up

```bash
terraform destroy
```

## Required APIs

- [Cloud Functions API](https://console.cloud.google.com/apis/api/cloudfunctions.googleapis.com)
- [Cloud Run API](https://console.cloud.google.com/apis/api/run.googleapis.com)
- [Cloud Scheduler API](https://console.cloud.google.com/apis/api/cloudscheduler.googleapis.com)
- [Eventarc API](https://console.cloud.google.com/apis/api/eventarc.googleapis.com)
- [Identity and Access Management (IAM) API](https://console.cloud.google.com/apis/api/iam.googleapis.com)
- [Secret Manager API](https://console.cloud.google.com/apis/api/secretmanager.googleapis.com)

## Required Permissions

### Deploy

- roles/cloudfunctions.admin
  - cloudfunctions.functions.create
  - cloudfunctions.functions.delete
  - cloudfunctions.functions.get
  - cloudfunctions.functions.update
  - cloudfunctions.operations.get
  - run.services.getIamPolicy
  - run.services.setIamPolicy
- roles/cloudscheduler.admin
  - cloudscheduler.jobs.create
  - cloudscheduler.jobs.delete
  - cloudscheduler.jobs.enable
  - cloudscheduler.jobs.get
  - cloudscheduler.jobs.update
- roles/iam.serviceAccountUser
  - iam.serviceAccounts.actAs
  - iam.serviceAccounts.get
- roles/iam.serviceAccountDeleter
  - iam.serviceAccounts.delete
- roles/pubsub.viewer
  - pubsub.topics.get
- roles/secretmanager.admin
  - secretmanager.secrets.create
  - secretmanager.secrets.delete
  - secretmanager.secrets.get
- roles/storage.admin
  - storage.buckets.get
  - storage.objects.create
  - storage.objects.delete
  - storage.objects.get

### Run

- roles/secretmanager.secretAccessor
  - resourcemanager.projects.get
  - resourcemanager.projects.list
  - secretmanager.versions.access
