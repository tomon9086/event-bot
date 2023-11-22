import { https, pubsub } from 'firebase-functions'
import { postNewEvents } from './app/event'

export const ping = https.onRequest((_, res) => {
  res.send('pong')
})

export const everyday = pubsub
  .schedule('0 9-21 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async (_context) => {
    await postNewEvents()
  })
