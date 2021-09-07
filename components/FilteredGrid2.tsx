import { useRouter } from 'next/router'
import React, { CSSProperties, useEffect, useState } from 'react'
import AnimateHeight from 'react-animate-height'
// import { Flipped, Flipper } from 'react-flip-toolkit'
import { Content } from '../lib/markdownReader'
import { getMostSpecificCriteria } from '../src/filter'
import { Filter } from '../src/filter/Filter'
import { SortOption } from '../src/filter/SortOption'
import { BookFilter2 } from './BookFilter2'
import { FilteredGridSort } from './FilteredGridSort'
import { Button, H3 } from './Html'

type Props<T> = {
  itemName: string
  items: T[]
  filters?: Filter<T>[]
  sorters?: SortOption<T>[]
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

export function FilteredGrid2<T extends Content>({
  itemName,
  items,
  filters = [],
  sorters = [],
  children,
}: Props<T>): JSX.Element {
  const router = useRouter()
  const { query } = router
  const [filteredItems, setFilteredItems] = useState<T[]>(items)
  const [filterOpen, setFilterOpen] = useState(false)
  const [sorter, setSorter] = useState(sorters[0])

  useEffect(() => {
    const filteredItems = items.filter((item) =>
      filters?.every((filter) => filter.isMatching(item, query))
    )
    if (sorters.length) {
      const sortOption =
        sorters.find((s) => s.key === query['sort']) || sorters[0]
      if (sortOption.key !== sorter.key) {
        setSorter(sortOption)
      }
      filteredItems.sort(sortOption.sort)
    }
    setFilteredItems(filteredItems)
  }, [items, filters, query, sorters])

  const criterias = filters
    .map((filter) => getMostSpecificCriteria(query, filter.key))
    .reduce((x, y) => x.concat(y), [])

  return (
    <div className="border-t pt-5 mt-10">
      <div className="flex-auto">
        <div className="flex gap-3 justify-between items-center py-2">
          <H3>{renderTitle(filteredItems.length, itemName, itemName)}</H3>
          <FilterButton
            criterias={criterias}
            className="flex-none inline-flex items-center justify-center uppercase"
            onClick={() => setFilterOpen(!filterOpen)}
          />
          <FilteredGridSort className="hidden md:block" sorters={sorters} />
        </div>
        <AnimateHeight duration={500} height={filterOpen ? 'auto' : 0}>
          <BookFilter2<T> filters={filters} items={items}></BookFilter2>
        </AnimateHeight>
        {/* <Flipper
          flipKey={`${sorter.key}-${filteredItems
            .map((item) => item.slug)
            .join('-')}`}
          spring="veryGentle"
        > */}
        {/* <div className="flex flex-row flex-wrap justify-items-start py-10"> */}
        <div className="grid gap-x-3 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-start py-10">
          {filteredItems.map((item) => (
            <div className="self-end">
              {children(item)}
              {/* <Flipped
                  // onAppear={onElementAppear}
                  // onExit={onExit}
                  key={item.slug}
                  flipId={item.slug}
                >
                  {(flippedProps) => (
                    <div {...flippedProps}>{children(item)}</div>
                  )}
                </Flipped> */}
            </div>
          ))}
        </div>
        {/* </Flipper> */}
      </div>
    </div>
  )
}

const baseStyle: CSSProperties = {
  stroke: 'none',
  strokeWidth: 2,
  strokeDasharray: 'none',
  strokeLinecap: 'butt',
  strokeLinejoin: 'miter',
  strokeMiterlimit: 10,
  fill: 'rgb(0,0,0)',
  fillRule: 'nonzero',
  opacity: 1,
}
const style: CSSProperties = {
  ...baseStyle,
  fill: 'rgb(0,0,0)',
}
const style2: CSSProperties = {
  ...baseStyle,
  fill: 'none',
}

type FilterButtonProps = JSX.IntrinsicElements['button'] & {
  criterias: string[]
}

function renderTitle(length: number, nameSingular: string, namePlural: string) {
  const name = length === 1 ? nameSingular : namePlural
  return length > 0
    ? `${length} ${name.toLowerCase()}`
    : `Hittar inga matchande ${name.toLowerCase()}`
}

function FilterButton({ criterias, ...rest }: FilterButtonProps) {
  return (
    <Button {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="289.984"
        height="289.984"
        viewBox="0 0 289.984 289.984"
        xmlSpace="preserve"
        className="h-4 w-4 mr-2"
      >
        <defs></defs>
        <g
          id="icon"
          style={style2}
          transform="translate(-1.611022222222232 -1.611022222222232) scale(3.22 3.22)"
        >
          <path
            d="M 15.205 90 c -1.104 0 -2 -0.896 -2 -2 V 55.115 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 V 88 C 17.205 89.104 16.31 90 15.205 90 z"
            style={style}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 74.795 59.357 c -1.104 0 -2 -0.896 -2 -2 V 2 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 55.357 C 76.795 58.462 75.899 59.357 74.795 59.357 z"
            style={style}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 45 90 c -1.104 0 -2 -0.896 -2 -2 V 27.922 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 V 88 C 47 89.104 46.104 90 45 90 z"
            style={style}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 45 29.922 c -5.464 0 -9.91 -4.445 -9.91 -9.91 s 4.445 -9.91 9.91 -9.91 c 5.465 0 9.91 4.445 9.91 9.91 S 50.465 29.922 45 29.922 z M 45 14.103 c -3.259 0 -5.91 2.651 -5.91 5.91 s 2.651 5.91 5.91 5.91 s 5.91 -2.651 5.91 -5.91 S 48.259 14.103 45 14.103 z"
            style={style}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 15.205 57.115 c -5.464 0 -9.91 -4.445 -9.91 -9.91 c 0 -5.464 4.445 -9.91 9.91 -9.91 s 9.91 4.445 9.91 9.91 C 25.115 52.67 20.669 57.115 15.205 57.115 z M 15.205 41.295 c -3.259 0 -5.91 2.651 -5.91 5.91 s 2.651 5.91 5.91 5.91 s 5.91 -2.651 5.91 -5.91 S 18.464 41.295 15.205 41.295 z"
            style={style}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 74.795 75.177 c -5.464 0 -9.909 -4.445 -9.909 -9.91 c 0 -5.464 4.445 -9.909 9.909 -9.909 c 5.465 0 9.91 4.445 9.91 9.909 C 84.705 70.731 80.26 75.177 74.795 75.177 z M 74.795 59.357 c -3.259 0 -5.909 2.65 -5.909 5.909 s 2.65 5.91 5.909 5.91 s 5.91 -2.651 5.91 -5.91 S 78.054 59.357 74.795 59.357 z"
            style={style}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 15.205 41.295 c -1.104 0 -2 -0.896 -2 -2 V 2 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 37.295 C 17.205 40.4 16.31 41.295 15.205 41.295 z"
            style={style}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 45 14.103 c -1.104 0 -2 -0.896 -2 -2 V 2 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 10.103 C 47 13.207 46.104 14.103 45 14.103 z"
            style={style}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 74.795 90 c -1.104 0 -2 -0.896 -2 -2 V 73.177 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 V 88 C 76.795 89.104 75.899 90 74.795 90 z"
            style={style}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
        </g>
      </svg>
      Filtrera
      {criterias.length > 0 && (
        <span className="text-gray-400 ml-1">({criterias.length})</span>
      )}
    </Button>
  )
}

// function onElementAppear(el: HTMLElement, index: number) {
//   spring({
//     onUpdate: (val) => {
//       if (typeof val === 'number') {
//         el.style.opacity = val.toString()
//         console.log('onElementAppear', index, val.toString())
//       }
//     },
//     delay: index * 50,
//   })
// }

// function onExit(el: HTMLElement, index: number, removeElement: () => void) {
//   spring({
//     onUpdate: (val) => {
//       if (typeof val === 'number') {
//         el.style.opacity = (1 - val).toString()
//         console.log('onExit', index, val.toString())
//       }
//     },
//     delay: index * 50,
//     // config: { overshootClamping: true },
//     // onUpdate: (val) => {
//     //   if (typeof val === 'number') {
//     //     el.style.transform = `scaleX(${1 - val})`
//     //   }
//     // },
//     // delay: index * 100,
//     onComplete: removeElement,
//   })

//   return () => {
//     el.style.opacity = ''
//     removeElement()
//   }
// }
