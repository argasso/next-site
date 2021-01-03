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
      <div className="grid gap-5 grid-cols-2 sm:grid-cols-books-3 md:grid-cols-books-4 lg:grid-cols-books-5 xl:grid-cols-books-6">
        {books.map((book, bookIndex) => (
          <div
            className="flex flex-col justify-center overflow-hidden"
            key={bookIndex}
          >
            <div className="flex-none h-3/4 shadow-md flex flex-col">
              <div className="mt-auto rounded shadow-lg overflow-hidden">
                <Link href={book.slug} key={`${bookIndex}-image`}>
                  {book.data.image && <Image image={book.data} size="small" />}
                </Link>
              </div>
            </div>
            <div className="flex-none h-1/4">
              <div className="p-2">
                <div className="font-bold mb-1">
                  <Link href={book.slug} key={`${bookIndex}-title`}>
                    {book.data.title}
                  </Link>
                </div>
                <div className="text-gray-700 text-xs">
                  {book.data.author
                    .map<React.ReactNode>((author, authorIndex) =>
                      författare[author]?.slug ? (
                        <Link
                          key={`${bookIndex}-${authorIndex}-author`}
                          href={`/foerfattare/${författare[author]?.slug}`}
                        >
                          {author}
                        </Link>
                      ) : (
                        <span key={`${bookIndex}-${authorIndex}-author`}>
                          {author}
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
    map[författare.data.name] = författare
    return map
  }, {})
  const books = listContent('boecker')
  return { props: { books, författare } }
}
