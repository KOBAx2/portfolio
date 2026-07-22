import rawData from '../data/links.yaml'

export interface LinkItem {
  id: string
  title: string
  url: string
}

function isValidLinkData(data: unknown): data is Array<{ title: string; url: string; external?: boolean }> {
  if (!Array.isArray(data)) return false
  return data.every(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      'title' in item &&
      typeof item.title === 'string' &&
      'url' in item &&
      typeof item.url === 'string'
  )
}

export function getLinkData(): LinkItem[] {
  if (!isValidLinkData(rawData)) {
    console.error('links.yaml のフォーマットが不正です')
    return []
  }

  return rawData.map((item, index) => ({
    id: `link-${index}`,
    title: item.title,
    url: item.url,
  }))
}