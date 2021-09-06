import { CmsCollectionFile } from 'netlify-cms-core'

const startPage: CmsCollectionFile = {
  label: 'Startsida',
  name: 'StartPage',
  file: 'content/index.md',
  fields: [
    { label: 'Title', name: 'title', widget: 'string' },
    { label: 'Intro', name: 'intro', widget: 'string' },
    {
      label: 'Banners',
      name: 'banners',
      widget: 'list',
      fields: [
        { label: 'Name', name: 'name', widget: 'string' },
        { label: 'Bild', name: 'image', widget: 'image' },
      ],
    },
    {
      label: 'Kommande',
      name: 'kommande',
      widget: 'list',
      fields: [
        {
          label: 'Bok',
          name: 'bok',
          widget: 'relation',
          collection: 'Book',
          search_fields: ['title'],
          display_fields: ['title'],
          value_field: '{{slug}}',
        },
        { label: 'Text', name: 'text', widget: 'markdown' },
      ],
    },
    {
      label: 'Optimering av sökmotorer SEO',
      name: 'seo',
      widget: 'object',
      collapsed: false,
      fields: [
        {
          label: 'Titel',
          name: 'title',
          widget: 'string',
          required: false,
          hint: 'Alternativ titel att visa i sökresultatet på Google. Det är en fördel om denna är lite mer beskrivande än title på sidan. Om denna lämnas tom så visas samma som Titel (på sidan).',
        },
        {
          label: 'Beskrivning',
          name: 'description',
          widget: 'string',
          hint: 'Denna beskrivning visas i sökresultatet på Google. Max 160 tecken.',
        },
      ],
    },
  ],
}

export default startPage
