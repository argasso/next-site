import { H1, H2, H3, Blockquote, UL, Img } from '../components/Html'
import type {
  CMS,
  CmsFieldObject,
  CmsFieldSelect,
  CmsFieldBase,
  CmsField,
  CmsFieldMeta,
} from 'netlify-cms-core'
import remarkEmojiPlugin from 'remark-emoji'
import { FC, PropsWithChildren } from 'react'
import { getDocumentStyles } from './documentHelper'
import { PreviewTemplateMenysida } from '../components/cms/PreviewTemplateMenysida'
import { KatalogForm } from '../components/mdx/components/KatalogForm'

export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  blockquote: Blockquote,
  ul: UL,
  img: Img,
}

export const mdPlugins = [remarkEmojiPlugin]

const components = {
  ...mdxComponents,
  h1: AvoidH1,
}

const scope = { KatalogForm }

const Avoid: FC<{ label: string; message: string }> = ({
  label,
  message,
  children,
}) => (
  <div className="border-red-700 border-2 p-1 rounded bg-red-50">
    {children}
    <p className="text-red-700">
      Undvik <code>{label}</code>. {message}
    </p>
  </div>
)

function AvoidH1(props: PropsWithChildren<{}>) {
  return (
    <Avoid
      label="H1"
      message="'Titel' visas som H1. Rekommendationen är att ha en H1 per sida. "
    >
      <H1 {...props} />
    </Avoid>
  )
}

export async function customizeCms(cms: CMS) {
  await registerMdxWidget(cms)
  registerPreviewStyle(cms)
  registerPreviewTemplates(cms)
}

async function registerMdxWidget(cms: CMS) {
  const mdx = await import('netlify-cms-widget-mdx')

  const preview = mdx.setupPreview({
    components,
    scope,
    mdPlugins,
  })
  const control = mdx.MdxControl
  cms.registerWidget('mdx', control, preview)
}

function registerPreviewStyle(cms: CMS) {
  const styles = getDocumentStyles()
  cms.registerPreviewStyle(styles, { raw: true })
}

function registerPreviewTemplates(cms: CMS) {
  cms.registerPreviewTemplate('Category', PreviewTemplateMenysida)
}
// cms.registerWidget(
//   'mdx',
//   mdx.MdxControl,
//   mdx.setupPreview({
//     components: {
//       ...mdxComponents,
//       h1: AvoidH1,
//     },
//     scope: {
//       // Layout: (props) => (
//       //   <div
//       //     style={{
//       //       padding: '10px',
//       //       border: '1px solid green',
//       //       borderRadius: '5px',
//       //     }}
//       //     {...props}
//       //   />
//       // ),
//     },
//     // allowedImports: {
//     //   '../components/Html': {
//     //     DefaultImport: H1,
//     //   },
//     // },
//     mdPlugins: [remarkEmojiPlugin],
//   })

export function getObjectField(
  name: string,
  fields?: CmsField[]
): CmsFieldBase & CmsFieldObject {
  const field = fields?.find((f) => f.name === name)
  if (field?.widget === 'object' && !isFieldMeta(field)) {
    return field
  }
  throw new Error('Field is not a CmsFieldObject')
}

export function getSelectField(
  name: string,
  fields?: CmsField[]
): CmsFieldBase & CmsFieldSelect {
  const field = fields?.find((f) => f.name === name)
  if (field?.widget === 'select' && !isFieldMeta(field)) {
    return field
  }
  throw new Error('Field is not a CmsFieldSelect')
}

export function isFieldMeta(
  field: CmsField
): field is CmsFieldBase & CmsFieldMeta {
  return (field as CmsFieldMeta).meta !== undefined
}
