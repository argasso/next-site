import { unSlug } from '../../components/Breadcrumbs'
import { BookContent } from '../../lib/markdownReader'
import categoryCollection from '../cms/collections/categoryCollection'
import { Filter } from './Filter'
import { FilterParameter } from './FilterParameter'

export class BookCategoryFilter extends Filter<BookContent> {
  constructor(categories: string[][]) {
    const title = categoryCollection.label_singular || categoryCollection.label
    const key = categoryCollection.name.toLowerCase()
    super(title, key, createParameters(categories, key))
  }

  isMatchingItem(item: BookContent, criteria: string) {
    return !!item.data.kategori?.some((kategori) => kategori.includes(criteria))
  }
}

function createParameters(categorySlugs: string[][], key: string) {
  const map = categorySlugs.reduce<Record<string, FilterParameter>>(
    (prev, curr) => {
      const slug = curr.join('/')
      prev[slug] = new FilterParameter(unSlug(curr[curr.length - 1]), slug, key)
      return prev
    },
    {}
  )

  const parameters = Object.entries(map).reduce<FilterParameter[]>(
    (prev, [slug, parameter]) => {
      const parentSlug = slug.split('/').slice(0, -1).join('/')
      const parent = map[parentSlug]
      if (parent) {
        parent.addParameter(parameter)
      } else {
        prev.push(parameter)
      }
      return prev
    },
    []
  )

  return parameters
}
