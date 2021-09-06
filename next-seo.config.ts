import { NextSeoProps } from 'next-seo'

const config: NextSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'sv-SE',
    url: 'https://www.argasso.se/',
    site_name: 'Argasso bokförlag',
  },
  twitter: {
    handle: '@ArgassoBok',
    site: '@ArgassoBok',
    cardType: 'summary_large_image',
  },
}

export default config
