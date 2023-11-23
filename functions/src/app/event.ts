import { ConnpassEvent, retrieveEvents } from '../connpass'
import { APPLICATION_ID, retrieveMessages, sendMessage } from '../discord'

const formatEventMessage = (event: ConnpassEvent) => {
  return (
    `**${event.title}**\n` +
    `> 日時：${event.started_at ?? 'N/A'}\n` +
    `> 場所：${event.place ?? 'N/A'}\n` +
    `> 詳細：${event.event_url ?? 'N/A'}`
  )
}

export const postNewEvents = async () => {
  const { events } = await retrieveEvents()
  const messages = await retrieveMessages()
  const messagesFromMe = messages?.filter(
    (message) => message.author.id === APPLICATION_ID
  )
  const newEvents = events.filter(
    (event) => !messagesFromMe?.find((m) => m.content.includes(event.event_url))
  )

  await Promise.all(
    newEvents
      .map((event) => formatEventMessage(event))
      .map((content) => sendMessage(content))
  )

  return newEvents
}
