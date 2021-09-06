import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { H1, H2, H3, Blockquote } from '../components/Html'
import { KatalogForm } from './KatalogForm'

const components = {
  H1,
  H2,
  H3,
  h1: H1,
  h2: H2,
  h3: H3,
  blockquote: Blockquote,
  KatalogForm: KatalogForm,
}

interface Props {
  source: MDXRemoteSerializeResult
}

export function MdxContent({ source }: Props) {
  return (
    <div className="wrapper">
      <MDXRemote {...source} components={components} />
    </div>
  )
}
