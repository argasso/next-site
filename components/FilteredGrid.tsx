//import { Filter } from "../src/filter/Filter";

import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React, { useEffect, useState } from 'react'
import { asArray } from '../lib/utils'
import { Filter } from '../src/filter/Filter'
import { FilterParameter } from '../src/filter/FilterParameter'
import { BookFilter } from './BookFilter'

type Props<T> = {
  items: T[]
  filters: Filter<T>[]
  children: (item: T) => React.ReactNode
}

type ParameterStateValue = {
  count?: number
  selected: boolean
}

type ParameterState = {
  [parameterKey: string]: ParameterStateValue
}

export type FilterState = {
  [filterKey: string]: ParameterState
}

export function FilteredGrid<T>({
  items,
  filters,
  children,
}: Props<T>): JSX.Element {
  const router = useRouter()
  const [filteredItems, setFilteredItems] = useState<T[]>(items)
  const [filterState, setFilterState] = useState<FilterState>({})

  useEffect(() => {
    const filteredItems = items.filter((item) =>
      filters.every((filter) => filter.isMatching(item, router.query))
    )
    const filterState = filters.reduce<FilterState>((previous, filter) => {
      const paramState = calculateFilterState(
        filter.parameters,
        router.query,
        filter,
        filteredItems,
        items
      )
      previous[filter.key] = paramState
      return previous
    }, {} as FilterState)
    setFilteredItems(filteredItems)
    setFilterState(filterState)
  }, [items, filters, router.query])

  return (
    <>
      <hr className="border-1" />
      <div className="flex">
        {filters && (
          <div className="flex-none w-1/5">
            <BookFilter<T>
              filters={filters}
              filterState={filterState}
            ></BookFilter>
          </div>
        )}
        <div className="flex-none w-4/5">
          {items && (
            <div className="flex flex-row flex-wrap justify-start gap-6 my-10">
              {filteredItems.map((item) => children(item))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function calculateFilterState<T>(
  parameters: FilterParameter[],
  query: ParsedUrlQuery,
  filter: Filter<T>,
  filteredItems: T[],
  allItems: T[]
) {
  return parameters.reduce<ParameterState>((prev, parameter) => {
    const filterQuery = asArray(query[filter.key])
    const selected = filterQuery.includes(parameter.value)
    const count = selected
      ? undefined
      : allItems.filter((item) =>
          filter.isMatching(item, {
            ...query,
            [filter.key]: [...filterQuery, parameter.value],
          })
        ).length
    prev[parameter.value] = { selected, count }
    if (parameter.hasParameters()) {
      const subState = calculateFilterState(
        parameter.getParameters(),
        query,
        filter,
        filteredItems,
        allItems
      )
      prev = {
        ...prev,
        ...subState,
      }
    }
    return prev
  }, {})
}
