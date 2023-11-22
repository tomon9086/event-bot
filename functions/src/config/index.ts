import * as functions from 'firebase-functions'

const config = functions.config()

const channelId = config.discord?.channel_id
const token = config.discord?.token
if (!channelId || !token) {
  throw new Error('insufficient discord config')
}

export const discord = {
  channelId,
  token
}
