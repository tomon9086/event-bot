import { DateTime } from 'luxon'

export const formatFullDateTime = (dt: DateTime): string => {
  return dt.setZone('Asia/Tokyo').toFormat('yyyy/MM/dd HH:mm')
}
