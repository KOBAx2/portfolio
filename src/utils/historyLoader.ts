import rawData from '../data/history.yaml'

// 1. 入力データ（YAML）の型定義
export interface HistoryEntry {
  title?: string
  url?: string
  desc: string
}

export interface YearGroup {
  year: number
  entries: HistoryEntry[]
}

// 2. 出力データ（Vue描画用）の型定義
export interface GroupedEntry {
  year: number
  entries: Array<{
    id: string
    title: string | null
    url: string | null
    desc: string
  }>
}

// 3. 型ガード
function isValidHistoryData(data: unknown): data is YearGroup[] {
  if (!Array.isArray(data)) return false

  return data.every(
    (group) =>
      typeof group === 'object' &&
      group !== null &&
      'year' in group &&
      typeof group.year === 'number' &&
      'entries' in group &&
      Array.isArray(group.entries)
  )
}

// 4. データ取得・整形用関数
export function getHistoryData(): GroupedEntry[] {
  if (!isValidHistoryData(rawData)) {
    console.error('YAMLのフォーマットが不正です')
    return []
  }

  return rawData.map((group) => ({
    year: group.year,
    entries: group.entries.map((entry, index) => ({
      id: `${group.year}-${index}`,
      title: entry.title ?? null,
      url: entry.url ?? null,
      desc: entry.desc ?? '',
    })),
  }))
}