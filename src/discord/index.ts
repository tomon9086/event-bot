import { discord } from '@/config'
import {
  Client,
  IntentsBitField,
  MessageCreateOptions,
  MessagePayload
} from 'discord.js'

export const APPLICATION_ID = '1176670024589656144'

const discordToken = discord.token

const discordClient = async () => {
  const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages]
  })
  await client.login(discordToken)

  return client
}

export const sendMessage = async (
  channelId: string,
  message: string | MessagePayload | MessageCreateOptions
) => {
  const client = await discordClient()
  const channel = await client.channels.fetch(channelId)
  if (channel?.isTextBased()) {
    return await channel.send(message)
  }

  return undefined
}

export const retrieveMessages = async (channelId: string) => {
  const client = await discordClient()
  const channel = await client.channels.fetch(channelId)
  if (channel?.isTextBased()) {
    return await channel.messages.fetch({
      limit: 100
    })
  }

  return undefined
}
