import React from 'react'
import { ExtractActionParameters } from '../lib/markdownReader'
import { renderAuthors } from './AuthorLink'
import { H3 } from './Html'
import Image from './Image'

export default function BookCardBig({
  text,
  bok,
}: {
  text: string
  bok: ExtractActionParameters<'boecker'>
}) {
  return (
    <div className="flex flex-row items-start">
      <div className="w-2/5">
        <Image size="small" image={bok.data.image} />
      </div>
      <div className="flex flex-col w-3/5 justify-center items-start pl-6">
        <p className="text-sm uppercase">
          {bok.meta && renderAuthors(bok.meta?.författare)}
        </p>
        <H3>{bok.data.title}</H3>
        <p className="leading-normal mb-4 line-clamp-6">{text}</p>
      </div>
    </div>
    // <div className="flex flex-row justify-items-stretch mx-auto rounded-md shadow-md overflow-hidden">
    //   <div className="flex-1" style={{ width: 200 }}>
    //     <Link href={bok.data.slug}>
    //       {bok.data.image && <Image image={bok.data} size="small" />}
    //     </Link>
    //   </div>
    //   <div className="flex-1 px-3 py-3">
    //     <Link href={bok.data.slug} className="text-md">
    //       {bok.data.title}
    //     </Link>
    //     <div className="text-sm">
    //       {bok.meta &&
    //         bok.meta.författare
    //           .map<React.ReactNode>((författare) => (
    //             <Link
    //               // key={`${bok.data.slug}-author-${authorIndex}`}
    //               href={`/foerfattare/${författare.slug}`}
    //             >
    //               {författare.name}
    //             </Link>
    //           ))
    //           .reduce(
    //             (prev, curr) => (prev == null ? [curr] : [prev, ', ', curr]),
    //             null
    //           )}
    //     </div>
    //     <div>{text}</div>
    //   </div>
    // </div>
  )
}
