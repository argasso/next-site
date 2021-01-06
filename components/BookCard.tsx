import React from 'react'
import { ExtractActionParameters } from '../lib/markdownReader'
import Link from './Link'
import Image from './Image'

export default function ({ bok }: { bok: ExtractActionParameters<'boecker'> }) {
  return (
    <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
      <Link href={bok.slug}>
        {bok.data.image && <Image image={bok.data} size="small" />}
      </Link>
      <div className="px-5 py-3">
        <h3 className="text-gray-700">{bok.data.title}</h3>
        <span className="text-gray-500 mt-2">{bok.data.author}</span>
      </div>
    </div>
  )
}
