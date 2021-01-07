import React from 'react'
import { ExtractActionParameters } from '../lib/markdownReader'
import Link from './Link'
import Image from './Image'

export default function BookCard({
  bok,
}: {
  bok: ExtractActionParameters<'boecker'>
}) {
  return (
    // <div className="flex ">
    <div
      className="mt-auto mx-auto rounded-md shadow-md overflow-hidden"
      style={{ width: 200 }}
    >
      <Link href={bok.data.slug}>
        {bok.data.image && <Image image={bok.data} size="small" />}
      </Link>
      <div style={{ height: 100 }} className="px-3 py-3 h-20">
        <Link href={bok.data.slug} className="text-md">
          {bok.data.title}
        </Link>
        <div className="text-sm">
          {bok.meta &&
            bok.meta.författare
              .map<React.ReactNode>((författare) => (
                <Link
                  // key={`${bok.data.slug}-author-${authorIndex}`}
                  href={`/foerfattare/${författare.slug}`}
                >
                  {författare.name}
                </Link>
              ))
              .reduce(
                (prev, curr) => (prev == null ? [curr] : [prev, ', ', curr]),
                null
              )}
        </div>
      </div>
    </div>
    // </div>
  )
}
