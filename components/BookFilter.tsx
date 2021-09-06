import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React, { ChangeEventHandler, useCallback } from 'react'
import { Filter } from '../src/filter/Filter'
import { FilterParameter } from '../src/filter/FilterParameter'
import { FilterState } from './FilteredGrid'
import AnimateHeight from 'react-animate-height'

type Props<T> = {
  filters: Filter<T>[]
  filterState: FilterState
}

export function BookFilter<T>({ filters, filterState }: Props<T>) {
  const router = useRouter()

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value, checked } = e.target
      const query = updateQuery(router.query, name, value, checked)
      router.push({ query }, undefined, { shallow: true })
    },
    [router]
  )

  const renderParameters = (
    parameters: FilterParameter[],
    filterKey: string,
    parentSelected: boolean
  ) => {
    const state = filterState[filterKey] || {}
    return (
      <AnimateHeight duration={500} height={parentSelected ? 'auto' : 0}>
        <ul className={'ml-8'}>
          {parameters.map((parameter) => (
            <li key={parameter.value}>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name={filterKey}
                  value={parameter.value}
                  className="m-1 rounded-sm h-6 w-6 text-red-500"
                  onChange={handleOnChange}
                  checked={!!state[parameter.value]?.selected}
                />
                <span className="pl-0 font-light text-sm overflow-x-hidden">
                  <span className="pl-1 capitalize">
                    {parameter.label}
                    {state[parameter.value]?.count != null && (
                      <span className="text-gray-500">
                        ({state[parameter.value]?.count})
                      </span>
                    )}
                  </span>
                </span>
              </label>
              {renderParameters(
                parameter.getParameters(),
                filterKey,
                state[parameter.value]?.selected
              )}
            </li>
          ))}
        </ul>
      </AnimateHeight>
    )
  }

  return (
    <>
      {filters.map((filter) => (
        <div key={filter.key} className="block">
          <span className="text-gray-700">{filter.title}</span>
          <div className="mt-2 -ml-8">
            {renderParameters(filter.parameters, filter.key, true)}
          </div>
        </div>
      ))}
    </>
  )
}

function updateQuery(
  query: ParsedUrlQuery,
  name: string,
  value: string,
  add: boolean
) {
  if (name === 'slug') return query // Protect Next's slug
  const parameters = query[name] || []
  const array = Array.isArray(parameters) ? parameters : [parameters]
  if (!array.includes(value)) {
    array.push(value)
  }
  const removed = array.filter((p) => add || !p.startsWith(value))
  return { ...query, [name]: removed }
}
