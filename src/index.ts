import { CloudEvent, cloudEvent } from '@google-cloud/functions-framework'
import { postNewEvents } from './app/event'

type PubSubEventData = {
  message: {
    data: string
  }
}

const channelIds = [
  '1177594721003122689', // OSK #イベント
  '1179943923892899840' // Manettia #技術イベント
]

cloudEvent('everyHourDaytime', async (_: CloudEvent<PubSubEventData>) => {
  await postNewEvents(channelIds)
})
