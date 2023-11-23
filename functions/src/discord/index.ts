import { discord } from '@/config'
import {
  Client,
  IntentsBitField,
  MessageCreateOptions,
  MessagePayload
} from 'discord.js'

export const APPLICATION_ID = '1176670024589656144'

const channelId = discord.channelId
const discordToken = discord.token

if (!channelId) {
  throw new Error('empty CHANNEL_ID')
}

if (!discordToken) {
  throw new Error('empty DISCORD_TOKEN')
}

const discordClient = async () => {
  const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages]
  })
  await client.login(discordToken)

  return client
}

export const sendMessage = async (
  message: string | MessagePayload | MessageCreateOptions
) => {
  const client = await discordClient()
  const channel = await client.channels.fetch(channelId)
  if (channel?.isTextBased()) {
    return await channel.send(message)
  }

  return undefined
}

export const retrieveMessages = async () => {
  const client = await discordClient()
  const channel = await client.channels.fetch(channelId)
  if (channel?.isTextBased()) {
    return await channel.messages.fetch({
      limit: 100
    })
  }

  return undefined
}
