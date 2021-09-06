import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react'
import AnimateHeight from 'react-animate-height'
import { Filter } from '../src/filter/Filter'
import { FilterParameter } from '../src/filter/FilterParameter'

interface Props<T> {
  parameter: FilterParameter
  items: T[]
  filter: Filter<T>
}

export function BookFilterParameter<T>({ parameter, items, filter }: Props<T>) {
  const router = useRouter()
  // const [filteredItems, setFilteredItems] = useState<T[]>(items)
  const [count, setCount] = useState(0)
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    const { query } = router
    const isSelected = parameter.isSelected(query)
    setSelected(isSelected)

    setCount(
      items.filter((item) => filter.isMatching(item, {}, parameter)).length
    )

    // items.filter((item) => filter.isMatching(item, query))
    // items.filter((item) => filter.isMatching(item, query, parameter))

    // setFilteredItems(
    //   items.filter((item) => filter.isMatching(item, {}, parameter))
    // )
  }, [router, items])

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value, checked } = e.target
      const query = updateQuery(router.query, name, value, checked)
      router.push({ query }, undefined, { shallow: true })
    },
    [router]
  )

  return (
    <li>
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          name={filter.key}
          value={parameter.value}
          className="m-1 rounded-sm h-6 w-6 text-red-500"
          onChange={handleOnChange}
          checked={selected}
        />
        <span className="pl-0 font-light text-sm overflow-x-hidden">
          <span className="pl-1 capitalize">
            {parameter.label}
            {!selected && <span className="text-gray-400"> ({count})</span>}
          </span>
        </span>
      </label>

      {parameter.getParameters() && (
        <AnimateHeight duration={500} height={selected ? 'auto' : 0}>
          <ul className="ml-8">
            {parameter.getParameters().map((p) => (
              <BookFilterParameter
                key={p.value}
                parameter={p}
                items={items}
                filter={filter}
              />
            ))}
          </ul>
        </AnimateHeight>
      )}
    </li>
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
