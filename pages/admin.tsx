import dynamic, { LoaderComponent } from 'next/dynamic'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import config from '../src/cms/config'
import { customizeCms } from '../lib/cmsHelper'

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-gray-500 font-normal text-base">Loading...</p>
  </div>
)

const CMS = dynamic(
  () =>
    import('netlify-cms-app').then(async (cms) => {
      await customizeCms(cms.default)
      cms.default.init({ config })
    }) as LoaderComponent,
  {
    ssr: false,
    loading: Loading,
  }
)

const AdminPage = () => {
  return (
    <>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <CMS />
    </>
  )
}

AdminPage.getLayout = (page: ReactElement) => <>{page}</>

// export const getStaticProps = () => {
//   const files = {
//     './demo.tsx': `
// import * as React from 'react'

// function Demo() {
//   return <div>Neat demo!</div>
// }

// export default Demo
//     `,
//   }
//   return { props: { files } }
// }

export default AdminPage
