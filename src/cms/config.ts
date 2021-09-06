import { CmsConfig, CmsCollection } from 'netlify-cms-core'
import authorCollection from './collections/authorCollection'
import bookCollection from './collections/bookCollection'
import categoryCollection from './collections/categoryCollection'
import pages from './pages'

export type Collection = Omit<CmsCollection, 'nested'> & {
  nested?: {
    depth: number
    summary: string
  }
}

type Config = Omit<CmsConfig, 'collections'> & {
  cms_manual_init?: boolean
  local_backend?: boolean
  collections: Collection[]
}

const config: Config = {
  cms_manual_init: true,
  local_backend: true,
  backend: {
    name: 'git-gateway',
    branch: 'main',
  },

  media_folder: '/public/uploads',
  public_folder: '/uploads',
  slug: {
    encoding: 'ascii',
    clean_accents: true,
  },
  collections: [categoryCollection, authorCollection, bookCollection, pages],
}

export default config
