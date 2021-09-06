import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { sep } from 'path'
import { BookContent, getFiles, listContent } from '../lib/markdownReader'
import { Category } from '../src/types/netlify-types'
import { serialize } from 'next-mdx-remote/serialize'
import { MdxContent } from '../components/MdxContent'
import BookCard from '../components/BookCard'
import { getLayout } from '../components/layouts/DefaultLayout'
import { NextSeo } from 'next-seo'
import { H1, H2 } from '../components/Html'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { getCategorySlugs } from '../src/filter'
import { BookBindingFilter } from '../src/filter/BookBindingFilter'
import { BookCategoryFilter } from '../src/filter/BookCategoryFilter'
import { FilteredGrid2 } from '../components/FilteredGrid2'
import { useEffect } from 'react'
import { Filter } from '../src/filter/Filter'
import { SortOnDateNewest } from '../src/filter/SortOnDateNewest'
import { SortOnDateOldest } from '../src/filter/SortOnDateOldest'
import { asArray } from '../lib/utils'
import NextLink from 'next/link'

function MenysidorPage({
  attributes,
  mdxSource,
  books,
  categories,
  subCategories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const [filters, setFilters] = useState<Filter<BookContent>[]>([])

  useEffect(() => {
    const bookBindingFilter = new BookBindingFilter()
    const bookCategoryFilter = new BookCategoryFilter(categories)
    setFilters([bookCategoryFilter, bookBindingFilter])
  }, [categories])

  // const filteredBooks = useMemo(() => {
  //   const bookBindingFilter = new BookBindingFilter()
  //   const bookCategoryFilter = new BookCategoryFilter(categorySlugs)
  //   return new FilteredItems<BookContent>(books || [], [
  //     bookCategoryFilter,
  //     bookBindingFilter,
  //   ])
  // }, [books, router.query])

  //const slug = asArray(router.query['slug'])
  // const subCategories = categories
  //   .filter((c) => c.length === slug.length + 1)
  //   .filter((c) => c.join('/').startsWith(slug.join('/') + '/'))
  //   .map((c) => ({ title: unSlug(c[slug.length]), slug: c.join('/') }))

  //console.log(subCategories)
  //console.log('SLUGGGGG')

  const sorters = [new SortOnDateNewest(), new SortOnDateOldest()]
  return (
    <>
      <NextSeo
        title={attributes.seo.title || attributes.title}
        description={attributes.seo.description}
      ></NextSeo>
      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="flex-auto">
          <H1>{attributes.title}</H1>
          <div className="max-w-3xl">
            <MdxContent source={mdxSource}></MdxContent>
          </div>
          {attributes.image && (
            <div>
              <img src={attributes.image}></img>
            </div>
          )}
        </div>
        {subCategories.length > 0 && (
          <div className="w-full md:w-auto md:flex-none justify-start p-6 md:p-10 bg-gray-100 rounded shadow-lg">
            <H2>Avdelningar</H2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1">
              {subCategories.map((c) => (
                <div className="my-1">
                  <NextLink key={c.slug} href={router.pathname} as={c.slug}>
                    <a className="font-boldmb-2">{c.title}</a>
                  </NextLink>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {books && (
        <FilteredGrid2<BookContent>
          itemName={attributes.title}
          items={books}
          filters={filters}
          sorters={sorters}
        >
          {(book) => (
            <div key={book.slug} className="self-end">
              <BookCard bok={book} key={book.slug} />
            </div>
          )}
        </FilteredGrid2>
        // <>
        //   <hr className="border-1" />
        //   <div className="flex">
        //     <div className="flex-none w-1/5">
        //       <BookFilter filteredBooks={filteredBooks}></BookFilter>
        //     </div>
        //     <div className="flex-none w-4/5">
        //       {filteredBooks && (
        //         <div className="flex flex-row flex-wrap justify-start gap-6 my-10">
        //           {filteredBooks
        //             .getFilteredItems(router.query)
        //             // .filter((book) => isBookMatching(router.query, book, filters))
        //             .map((book) => (
        //               <div className="self-end">
        //                 <BookCard bok={book} key={book.slug} />
        //               </div>
        //             ))}
        //         </div>
        //       )}
        //     </div>
        //   </div>
        // </>
      )}
    </>
  )
}

MenysidorPage.getLayout = getLayout

export default MenysidorPage

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  //const params = ctx.params
  const slug = asArray(params?.slug)
  const path = slug.join(sep)
  const content = await import(`../content/kategorier/${path}/index.mdx`)
  const attributes: Category = content.attributes
  const mdxSource = await serialize(content.body)

  const books =
    slug[0] === 'boecker'
      ? listContent('boecker').filter((book) =>
          book.data.kategori?.some((k) => k.startsWith(path))
        )
      : null

  const categories = getCategorySlugs(
    getFiles('kategorier').filter(
      (category) => category.startsWith(path) && category !== path
    )
  )

  const subCategories = await Promise.all(
    categories
      .filter((c) => c.length === slug.length + 1)
      .filter((c) => c.join(sep).startsWith(slug.join(sep) + sep))
      .map(async (c) => {
        console.log(
          'importing',
          `../content/kategorier/${c.join(sep)}/index.mdx`
        )
        const content = await import(
          `../content/kategorier/${c.join(sep)}/index.mdx`
        )
        const attributes: Category = content.attributes
        const { title, image } = attributes
        return { title, image: image || null, slug: c.join(sep) }
      })
  )
  //.map((c) => ({ title: unSlug(c[slug.length]), slug: c.join(sep) }))

  return {
    props: { attributes, mdxSource, books, categories, subCategories },
  }
  //console.log('NOT FOUND in [...slug] ... slug:', slug)
  // return {
  //   notFound: true,
  // }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getFiles('kategorier')
  const paths = slugs.map((slug) => ({
    params: { slug: slug.split(sep) },
  }))

  return {
    paths,
    fallback: false,
  }
}

// function isBookMatching(
//   query: ParsedUrlQuery,
//   book: BookContent,
//   filters: Filter<BookContent>[]
// ): boolean {
//   return filters
//     .map((f) => f.key)
//     .every((key) => {
//       const criterias = asArray(query[key])
//       return (
//         criterias.length == 0 ||
//         criterias.some((criteria) =>
//           book.data.kategori?.some((kategori) => kategori.includes(criteria))
//         )
//       )
//     })
// }
