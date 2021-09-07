import { H1, H2, H3, UL, Blockquote } from '../Html'
import { KatalogForm } from './components/KatalogForm'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
// import * as UI from './components'

const components = {
  H1,
  H2,
  H3,
  h1: H1,
  h2: H2,
  h3: H3,
  ul: UL,
  blockquote: Blockquote,
  KatalogForm,
}

interface Props {
  code: string
}

export function MdxComponent({ code }: Props) {
  // console.log(code)
  const Component = useMemo(() => getMDXComponent(code), [code])
  return (
    <div className="wrapper">
      <Component components={components} />
    </div>
  )
}
