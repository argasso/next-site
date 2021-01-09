import React from 'react'
import { ExtractActionParameters } from '../lib/markdownReader'
import Image from './Image'

export default function BookCardBig({
  text,
  bok,
}: {
  text: string
  bok: ExtractActionParameters<'boecker'>
}) {
  return (
    <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
      <div className="flex flex-col w-full lg:w-1/2 justify-center items-start pt-12 pb-24 px-6">
        <p className="uppercase tracking-loose">{bok.data.author.join()}</p>
        <h1 className="font-bold text-3xl my-4">{bok.data.title}</h1>
        <p className="leading-normal mb-4">{text}</p>
        <button className="bg-transparent hover:bg-gray-900 text-gray-900 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-gray-900 hover:border-transparent">
          Super Button
        </button>
      </div>
      <div className="w-full lg:w-1/2 lg:py-6 text-center">
        <Image size="small" image={bok.data} />
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
