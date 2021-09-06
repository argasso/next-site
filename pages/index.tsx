import React from 'react'
import { InferGetStaticPropsType } from 'next'
import { getLayout } from '../components/layouts/SimpleLayout'
import { getContent } from '../lib/markdownReader'
// import Carousel from '../components/Carousel'
import CarouselEmbla from '../components/CarouselEmbla'
import BookCardBig from '../components/BookCardBig'
import { Hero } from '../components/Hero'
import { Section } from '../components/Section'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const IndexPage = ({ startsida: { data, meta } }: Props) => (
  <>
    <Hero title={data.title} intro={data.intro}></Hero>
    <Section title="Upptäck">
      <div className="">
        <CarouselEmbla banners={data.banners} />
      </div>
    </Section>
    <Section title="Nyheter">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
        {data.kommande.map((kommande) =>
          meta?.böcker[kommande.bok] ? (
            <BookCardBig
              key={kommande.bok}
              text={kommande.text}
              bok={meta?.böcker[kommande.bok]}
            />
          ) : (
            <p className="">Boken {kommande.bok} saknas!</p>
          )
        )}
      </div>
    </Section>
    <Section title="Kommande" color="gray">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.kommande.map((kommande) =>
          meta?.böcker[kommande.bok] ? (
            <BookCardBig
              key={kommande.bok}
              text={kommande.text}
              bok={meta?.böcker[kommande.bok]}
            />
          ) : (
            <p className="">Boken {kommande.bok} saknas!</p>
          )
        )}
      </div>
    </Section>
    <Section title="Nyheter"></Section>
    <Section title="Twitter" color="green"></Section>
  </>
)

IndexPage.getLayout = getLayout

export default IndexPage

export const getStaticProps = async () => {
  const startsida = getContent('', 'index')
  return { props: { startsida } }
}
