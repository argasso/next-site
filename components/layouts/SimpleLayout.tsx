import React, { FC } from 'react'
import { GetLayoutType } from '../../pages/_app'
import Layout from './Layout'

export const SimpleLayout: FC = ({ children }) => <main>{children}</main>

export const getLayout: GetLayoutType = (page, pageProps) => (
  <Layout>
    <SimpleLayout {...pageProps}>{page}</SimpleLayout>
  </Layout>
)
