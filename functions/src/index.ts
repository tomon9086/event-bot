import { https, pubsub } from 'firebase-functions'
import { DateTime } from 'luxon'
import { postNewEvents } from './app/event'

export const ping = https.onRequest((_, res) => {
  postNewEvents()
  
  res.send('pong')
})

export const everyday = pubsub
  .schedule('0 9 * * *')
  .timeZone('Asia/Tokyo')
  .onRun((_context) => {
    const now = DateTime.now()
      .setZone('Asia/Tokyo')

    console.log(now)
  })
