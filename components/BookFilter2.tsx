import React from 'react'
import { Filter } from '../src/filter/Filter'
import { BookFilterParameter } from './BookFilterParameter'
import { H4 } from './Html'

type Props<T> = {
  filters: Filter<T>[]
  items: T[]
}

export function BookFilter2<T>({ filters, items }: Props<T>) {
  return (
    <div>
      <a href="#">Nollställ filter</a>
      <div className="flex flex-col md:flex-row md:border-b">
        {filters.map((filter) => (
          <div key={filter.key} className="block border-b md:border-none py-3">
            <H4>{filter.title}</H4>
            <ul className="md:mr-10">
              {filter.parameters.map((parameter) => (
                <BookFilterParameter<T>
                  key={parameter.value}
                  parameter={parameter}
                  items={items}
                  filter={filter}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
