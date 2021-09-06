import { CmsField } from 'netlify-cms-core'
import { Collection } from '../config'
import seo from '../partials/seo'

const categoryCollection: Collection = {
  name: 'Category',
  label: 'Kategorier',
  label_singular: 'Kategori',
  folder: 'content/kategorier',
  extension: 'mdx',
  format: 'frontmatter',
  create: true,
  nested: {
    depth: 100,
    summary: '{{title}}',
  },
  media_folder: '{{media_folder}}/kategorier',
  public_folder: '{{public_folder}}/kategorier',
  preview_path: '/kategorier/{{slug}}',
  fields: [
    { label: 'Titel', name: 'title', widget: 'string' },
    {
      label: 'Meny',
      name: 'meny',
      widget: 'string',
      hint: 'Namn på länk i menyer. Utelämna för att använda Titel.',
      required: false,
    },
    { label: 'Beskrivning', name: 'body', widget: 'mdx' } as CmsField,
    { label: 'Bild', name: 'image', widget: 'image', required: false },
    seo,
  ],
  meta: { path: { widget: 'string', label: 'Path', index_file: 'index' } },
}

export default categoryCollection
