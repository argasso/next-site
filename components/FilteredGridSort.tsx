import { useRouter } from 'next/router'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { SortOption } from '../src/filter/SortOption'
import { Select } from './Html'

export function FilteredGridSort<T>({
  sorters,
  className,
}: {
  sorters: SortOption<T>[]
  className?: string
}) {
  const router = useRouter()
  const [sortKey, setSortKey] = useState(sorters[0].key)

  useEffect(() => {
    const sorter =
      sorters.find((s) => s.key === router.query['sort']) || sorters[0]
    if (sorter.key !== sortKey) {
      setSortKey(sorter.key)
    }
  }, [router])

  const handleOnChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const query = { ...router.query, sort: e.target.value }
    router.push({ query }, undefined, { shallow: true })
  }

  return (
    <Select className={className} value={sortKey} onChange={handleOnChange}>
      {sorters.map((s) => (
        <option key={s.key} value={s.key}>
          {s.key === sortKey ? 'Visar' : 'Visa'} {s.title}
        </option>
      ))}
    </Select>
  )
}
