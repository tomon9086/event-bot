import axios from 'axios'

const API_ORIGIN = 'https://connpass.com/api/v1'

const axiosInstance = axios.create({
  baseURL: API_ORIGIN
})

export type ConnpassEvent = {
  /** イベントID */
  event_id: number
  /** タイトル */
  title: string
  /** キャッチ */
  catch: string
  /** 概要(HTML形式) */
  description: string
  /** connpass.com 上のURL */
  event_url: string
  /** X(Twitter)のハッシュタグ */
  hash_tag: string
  /** イベント開催日時 (ISO-8601形式) */
  started_at: string
  /** イベント終了日時 (ISO-8601形式) */
  ended_at: string
  /** 定員 */
  limit: number
  /** イベント参加タイプ */
  event_type: string
  /** グループ */
  series: {
    /** グループID */
    id: number
    /** グループタイトル */
    title: string
    /** グループのconnpass.com 上のURL */
    url: string
  }
  /** 開催場所 */
  address: string
  /** 開催会場 */
  place: string
  /** 開催会場の緯度 */
  lat: number
  /** 開催会場の経度 */
  lon: number
  /** 管理者のID */
  owner_id: number
  /** 管理者のニックネーム */
  owner_nickname: string
  /** 管理者の表示名 */
  owner_display_name: string
  /** 参加者数 */
  accepted: number
  /** 補欠者数 */
  waiting: number
  /** 更新日時 (ISO-8601形式) */
  updated_at: string
}

type RetrieveEventsResponse = {
  /** 含まれる検索結果の件数 */
  results_returned: number
  /** 検索結果の総件数 */
  results_available: number
  /** 検索の開始位置 */
  results_start: number
  /** 検索結果のイベントリスト */
  events: ConnpassEvent[]
}

export const retrieveEvents = async () => {
  const res = await axiosInstance.get<RetrieveEventsResponse>(
    '/event?order=3&keyword_or=javascript,typescript,python,ctf,競プロ,アルゴリズム,レイトレ'
  )

  return res.data
}
