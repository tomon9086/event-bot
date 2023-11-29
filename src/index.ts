import { CloudEvent, cloudEvent } from '@google-cloud/functions-framework'
import { postNewEvents } from './app/event'

type PubSubEventData = {
  message: {
    data: string
  }
}

cloudEvent('everyHourDaytime', async (_: CloudEvent<PubSubEventData>) => {
  await postNewEvents()
})
