import * as functions from 'firebase-functions'

const config = functions.config()

const channelId = config.discord?.channel_id
const token = config.discord?.token

export const discord = {
  channelId,
  token
}
