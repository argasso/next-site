import { ParsedUrlQuery } from 'querystring'
import { unSlug } from '../../components/Breadcrumbs'
import { asArray } from '../../lib/utils'

export interface FilteredItems<T> {
  items: T[]
  filters: Filter[]
}

export interface Filter {
  title: string
  key: string
  parameters: FilterParameter[]
}

export interface FilterParameter {
  label: string
  value: string
  children?: FilterParameter[]
}

export type FilterParameterCount = FilterParameter & {
  count: number
}

export function createCategoryParameters(
  categories: string[]
): FilterParameter[] {
  return categories
    .sort()
    .map((category) => category.split('/').slice(1))
    .filter((array) => array.length > 0)
    .map((array) => ({
      label: unSlug(array.join(' / ')),
      value: array.join('/'),
    }))
}

export function getCategorySlugs(categories: string[]): string[][] {
  return categories
    .sort()
    .map((category) => category.split('/'))
    .filter((array) => array.length > 0)
}

export function getMostSpecificCriteria(
  query: ParsedUrlQuery,
  key: string,
  additionalValue?: string
): string[] {
  const queryCriterias = asArray(query[key])
  const criterias = additionalValue
    ? [...queryCriterias, additionalValue]
    : queryCriterias

  return criterias.filter(
    (criteria, _index, array) =>
      array.findIndex((c) => c.startsWith(`${criteria}/`)) === -1
  )
}
