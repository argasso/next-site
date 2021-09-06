import React, { FC } from 'react'
import { AuthorContent } from '../lib/markdownReader'
import Link from './Link'

export const AuthorLink: FC<{ author: AuthorContent }> = ({
  author: { slug, data: name },
}) => <Link href={`/foerfattare/${slug}`}>{name}</Link>

export const renderAuthors = (authors: AuthorContent[]) =>
  authors
    .map<React.ReactNode>((author, authorIndex) => (
      <Link key={`author-${authorIndex}`} href={`/foerfattare/${author.slug}`}>
        {author.data.name}
      </Link>
    ))
    .reduce((prev, curr) => (prev == null ? [curr] : [prev, ', ', curr]), null)
