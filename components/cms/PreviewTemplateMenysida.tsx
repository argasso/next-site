import React from 'react'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import { H1 } from '../Html'
import { GoogleSearchResult } from './GoogleSearchResult'

export function PreviewTemplateMenysida(props: PreviewTemplateComponentProps) {
  const entry = props.entry.toJS()
  const title = entry.data.title
  const seoTitle = entry.data.seo?.title || title
  const seoDescription = entry.data.seo?.description
  const path = entry.meta.path

  return (
    <div className="bg-white m-5">
      <H1>{title}</H1>
      {props.widgetFor('body')}
      <hr className="border-2 mb-6 mt-6" />
      <GoogleSearchResult
        title={seoTitle}
        description={seoDescription}
        path={path}
      />
    </div>
  )
}
