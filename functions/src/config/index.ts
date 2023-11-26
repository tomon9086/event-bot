import * as functions from 'firebase-functions'

const config = functions.config()

const token = config.discord?.token

export const discord = {
  token
}
