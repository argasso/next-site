import React from 'react'
import Layout from '../../components/Layout'
import { InferGetStaticPropsType } from 'next'
import { listContent } from '../../lib/markdownReader'
import Image from '../../components/Image'
import Link from '../../components/Link'

type Props = InferGetStaticPropsType<typeof getStaticProps>

function Index({ books, författare }: Props) {
  const title = 'Alla våra böcker'
  return (
    <Layout title={title}>
      <div className="flex flex-row flex-wrap justify-start">
        {books.map((book, bookIndex) => (
          <div className="flex-none flex flex-col m-2" key={bookIndex}>
            <div
              className="flex-none flex flex-col"
              style={{ height: '320px' }}
            >
              <div className="mt-auto rounded shadow-md relative overflow-hidden">
                <Link href={book.slug} key={`${bookIndex}-image`}>
                  {book.data.image && <Image image={book.data} size="small" />}
                </Link>
              </div>
            </div>
            <div className="flex-none">
              <div className="p-2">
                <div className="font-bold mb-1">
                  <Link href={book.slug} key={`${bookIndex}-title`}>
                    {book.data.title}
                  </Link>
                </div>
                <div className="text-gray-700 text-xs">
                  {book.data.author
                    .map<React.ReactNode>((authorSlug, authorIndex) =>
                      författare[authorSlug] ? (
                        <Link
                          key={`${bookIndex}-${authorIndex}-author`}
                          href={`/foerfattare/${authorSlug}`}
                        >
                          {författare[authorSlug].data.name}
                        </Link>
                      ) : (
                        <span key={`${bookIndex}-${authorIndex}-author`}>
                          {författare[authorSlug].data.name}
                        </span>
                      )
                    )
                    .reduce(
                      (prev, curr) =>
                        prev == null ? [curr] : [prev, ', ', curr],
                      null
                    )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <main></main>
    </Layout>
  )
}

export default Index

export const getStaticProps = async () => {
  const författarelista = listContent('foerfattare')
  const författare = författarelista.reduce<
    Record<string, typeof författarelista[number]>
  >((map, författare) => {
    map[författare.slug] = författare
    return map
  }, {})
  const books = listContent('boecker')
  return { props: { books, författare } }
}
