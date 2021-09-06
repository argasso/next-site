import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { NextSeo } from 'next-seo'
import SEO from '../next-seo.config'
import { MDXProvider } from '@mdx-js/react'
import { getLayout } from '../components/layouts/DefaultLayout'

import '../styles.css'
import { mdxComponents } from '../lib/cmsHelper'

type Override<T1, T2> = Omit<T1, keyof T2> & T2

export type PageProps = {
  attributes: {
    title: string
  }
}

export type GetLayoutType = (
  page: ReactElement,
  pageProps: PageProps
) => ReactNode

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: GetLayoutType
}

type Props = Override<AppProps, { pageProps: PageProps }> & {
  Component: NextPageWithLayout<PageProps>
}

function MyApp({ Component, pageProps }: Props) {
  const layout = Component.getLayout ?? getLayout

  return (
    <>
      <NextSeo {...SEO} />
      <MDXProvider components={mdxComponents}>
        {layout(<Component {...pageProps} />, pageProps)}
      </MDXProvider>
    </>
  )
}

export default MyApp
