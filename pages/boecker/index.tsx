import React from 'react'
import Layout from '../../components/Layout'
import { InferGetStaticPropsType } from 'next'
import { listContent } from '../../lib/markdownReader'
import BookCard from '../../components/BookCard'

type Props = InferGetStaticPropsType<typeof getStaticProps>

function Index({ böcker }: Props) {
  const title = 'Alla våra böcker'
  return (
    <Layout title={title}>
      <div className="flex flex-row flex-wrap justify-start">
        {böcker.map((bok) => (
          <BookCard bok={bok} />
        ))}
      </div>
      <main></main>
    </Layout>
  )
}

export default Index

export const getStaticProps = async () => {
  const böcker = listContent('boecker')
  return { props: { böcker } }
}
