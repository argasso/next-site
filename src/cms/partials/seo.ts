import { CmsField } from 'netlify-cms-core'

const seo: CmsField = {
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
}

export default seo
