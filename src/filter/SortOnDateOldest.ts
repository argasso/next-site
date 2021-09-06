import { BookContent } from '../../lib/markdownReader'
import { parseArgassoDate } from './SortOnDateNewest'
import { SortOption } from './SortOption'

export class SortOnDateOldest extends SortOption<BookContent> {
  constructor() {
    super('äldsta först', 'oldest')
  }
  sort(a: BookContent, b: BookContent) {
    return parseArgassoDate(a).localeCompare(parseArgassoDate(b))
  }
}
