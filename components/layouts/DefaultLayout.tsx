import React, { FC } from 'react'
import { GetLayoutType, PageProps } from '../../pages/_app'
import Breadcrumbs from '../Breadcrumbs'
//import { Header } from '../Header'
import Layout from './Layout'

export const DefaultLayout: FC<PageProps> = ({ children }) => (
  <>
    {/* <Header title={title} /> */}
    <main className="bg-white min-h-screen">
      <div className="container">
        <Breadcrumbs
          className="text-gray-500 py-3 text-sm font-light"
          rootName="Argasso"
        />
        {children}
      </div>
    </main>
  </>
)

export const getLayout: GetLayoutType = (page, pageProps) => (
  <Layout>
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
  </Layout>
)
