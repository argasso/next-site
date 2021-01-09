import React from 'react'
import { InferGetStaticPropsType } from 'next'
import Layout from '../components/Layout'
import { getContent } from '../lib/markdownReader'
import Carousel from '../components/Carousel'
import BookCardBig from '../components/BookCardBig'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const IndexPage = ({ startsida }: Props) => (
  <Layout title={startsida.data.title}>
    <h1>👋</h1>
    <Carousel banners={startsida.data.banners} />
    {startsida.data.kommande.map(
      (kommande) =>
        startsida.meta && (
          <BookCardBig
            text={kommande.text}
            bok={startsida.meta?.böcker[kommande.bok]}
          />
        )
    )}
  </Layout>
)

export default IndexPage

export const getStaticProps = async () => {
  const startsida = getContent('', 'index')
  return { props: { startsida } }
}
