import React from 'react'
import { BookContent } from '../lib/markdownReader'
import Link from './Link'
import Image from './Image'
import { H4 } from './Html'

export default function BookCard({ bok }: { bok: BookContent }) {
  const href = `/boecker/${bok.slug}`
  return (
    <div
      className="mt-auto rounded-md shadow-md overflow-hidden ease-in-out hover:shadow-lg w-40 smx:w-44 mdx:w-40 lgx:w-48"
      // style={{ width: 190 }}
    >
      <Link href={href}>
        {bok.data.image && <Image image={bok.data.image} size="small" />}
      </Link>
      <div style={{ height: 100 }} className="px-3 py-3 h-20">
        <Link href={href} className="">
          <H4>{bok.data.title}</H4>
        </Link>
        <div className="">
          {bok.meta &&
            bok.meta.författare
              .map<React.ReactNode>((författare, authorIndex) => (
                <Link
                  className="text-xs"
                  key={`${bok.slug}-author-${authorIndex}`}
                  href={`/foerfattare/${författare.slug}`}
                >
                  {författare.data.name}
                </Link>
              ))
              .reduce(
                (prev, curr) => (prev == null ? [curr] : [prev, ', ', curr]),
                null
              )}
        </div>
      </div>
    </div>
  )
}
