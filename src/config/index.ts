import { config } from 'dotenv'

config()

export const discord = {
  token: process.env.DISCORD_TOKEN
}
