import React, { FC } from 'react'
import Head from 'next/head'
import TopNav from '../TopNav'
import { GetLayoutType } from '../../pages/_app'
import { Footer } from '../Footer'

const Layout: FC = ({ children }) => {
  return (
    <div className="gradient">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <TopNav />

      {children}

      <Footer />
    </div>
  )
}
export const getLayout: GetLayoutType = (page) => <Layout>{page}</Layout>

export default Layout
