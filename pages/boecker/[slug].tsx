// import ReactMarkdown from 'react-markdown'

import Layout from '../../components/Layout'
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { firstParameter, getContent, listSlugs } from '../../lib/markdownReader'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const BookDetails: React.FC<Props> = ({ bookData }) => {
  if (!bookData) return <></>
  const { data: book } = bookData
  return (
    <Layout title={`${'Argasso'} | ${book.title}`}>
      <section className="text-gray-700 body-font overflow-hidden">
        <div className="mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="w-1/3 sm:w-1/3 h-auto object-contain object-top rounded"
            src={book.image}
          />
          <div className="w-2/3 pl-5 sm:pl-10 sm:py-6 mt-0 lg:mt-0">
            <div className="flex justify-between items-center">
              <h2 className="text-sm uppercase title-font text-gray-500 tracking-widest">
                {book.author}
              </h2>
              <div className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="ml-2 text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="ml-2 text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {book.title}
            </h1>
            <p className="uppercase text-cool-gray-500">
              {[book.generalDetails?.binding, book.generalDetails?.publishMonth]
                .filter((b) => b != null)
                .join(', ')}
            </p>
            <p className="leading-relaxed hidden sm:block mt-5">
              {/* <ReactMarkdown source={content} /> */}
            </p>
            <div className="flex border-t-2 pt-5 mt-5 border-gray-200">
              <span className="title-font font-medium text-2xl text-gray-900">
                {book.price} kr
              </span>
              <button className="flex ml-auto text-white bg-red-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Lägg i varukorg
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
          <p className="leading-relaxed block sm:hidden bg-cool-gray-100 mt-5 -mx-5 p-5">
            {/* <ReactMarkdown source={content} /> */}
          </p>
        </div>
      </section>{' '}
    </Layout>
  )
}
export default BookDetails

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const slug = firstParameter(context.params?.slug)
  const bookData = slug ? getContent('boecker', slug) : undefined
  return { props: { bookData }, notFound: !slug }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = listSlugs('boecker')
  const paths = slugs.map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
