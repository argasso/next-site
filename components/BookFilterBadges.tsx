import { useRouter } from 'next/router'
import { getMostSpecificCriteria } from '../src/filter'
import { Filter } from '../src/filter/Filter'

type Props<T> = {
  filters: Filter<T>[]
  items: T[]
}

function Badge({ value }: { value: string }) {
  return (
    <span className="px-2 py-1 text-base rounded-lg text-white bg-purple-500 inline-flex items-center">
      {value}
      <button
        type="button"
        className="ml-3 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      >
        <span className="sr-only">Ta bort</span>
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </span>
  )
}

export function BookFilterBadges<T>({ filters }: Props<T>) {
  const { query } = useRouter()

  const criterias = filters
    .map((filter) => getMostSpecificCriteria(query, filter.key))
    .reduce((x, y) => x.concat(y), [])
  return (
    criterias.length > 0 && (
      <div className="border-t-2 hidden md:block">
        {criterias.map((criteria) => (
          <Badge value={criteria} />
        ))}
      </div>
    )
  )
}
