import { BookContent } from '../../lib/markdownReader'
import { SortOption } from './SortOption'

const months = [
  'januari',
  'februari',
  'mars',
  'april',
  'maj',
  'juni',
  'juli',
  'augusti',
  'september',
  'oktober',
  'november',
  'december',
]

export class SortOnDateNewest extends SortOption<BookContent> {
  constructor() {
    super('nyaste först', 'newest')
  }
  sort(a: BookContent, b: BookContent) {
    return parseArgassoDate(b).localeCompare(parseArgassoDate(a))
  }
}

export function parseArgassoDate(book: BookContent) {
  const argassoDate = book.data.generalDetails?.publishMonth || ''
  const parts = argassoDate.split(' ')
  if (parts.length == 2) {
    const monthIndex = months.indexOf(parts[0])
    return `${parts[1]}${monthIndex < 10 ? '0' : ''}${monthIndex}`
  }
  return ''
}
