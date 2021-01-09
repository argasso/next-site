import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import {
  AuthorData,
  BookData,
  ContentWithImage,
  Startsida,
} from '../interfaces'
import sizeOf from 'image-size'
import memoized from 'nano-memoize'

type BookContent = {
  type: 'boecker'
  data: BookData
  meta?: {
    författare: AuthorData[]
    kategorier: string[]
  }
}

type AuthorContent = {
  type: 'foerfattare'
  data: AuthorData
  meta?: {
    böcker: BookData[]
  }
}

type IndexContent = {
  type: ''
  data: Startsida
  meta?: {
    böcker: Record<string, BookContent>
  }
}

export type Content = BookContent | AuthorContent | IndexContent

type ContentType = Content['type']
// type ExcludeTypeField<A> = { [K in Exclude<keyof A, 'type'>]: A[K] }
// export type ExtractActionParameters<T> = ExcludeTypeField<
//   Extract<Content, { type: T }>
// >
export type ExtractActionParameters<T> = Extract<Content, { type: T }>

export function listContent<T extends ContentType>(
  type: T
): ExtractActionParameters<T>[] {
  return listSlugs(type).map((slug) => getContent(type, slug))
}

export function getContent<T extends ContentType>(
  type: T,
  slug: string
): ExtractActionParameters<T> {
  const content = readContent(type, slug)
  if (isBok(content)) {
    const författare = content.data.author.map((authorSlug) => {
      return readContent('foerfattare', authorSlug).data
    })
    content.meta = {
      författare,
      kategorier: [],
    }
  } else if (isFörfattare(content)) {
    const böcker = listContent('boecker')
      .filter((bok) => bok.data.author.includes(content.data.slug))
      .map((bok) => bok.data)
    content.meta = {
      böcker,
    }
  } else if (isStartsida(content)) {
    const slugs = content.data.kommande.map((kommande) => kommande.bok)
    const böcker = listContent('boecker')
      .filter((bok) => slugs.includes(bok.data.slug))
      .reduce<Record<string, BookContent>>((map, bok) => {
        map[bok.data.slug] = bok
        return map
      }, {})
    content.meta = {
      böcker,
    }
  }
  return content
}

const readContent = memoized(function <T extends ContentType>(
  type: T,
  slug: string
) {
  const filePath = absolutePath(type, `${slug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content: body } = matter(fileContents)

  if (hasImage(data) && data.image) {
    const imagePath = join('.', 'public', data.image)
    if (fs.existsSync(imagePath)) {
      const { width, height } = sizeOf(imagePath)
      data.imageWidth = width
      data.imageHeight = height
    }
  }
  data.slug = slug
  data.body = body

  return {
    type,
    data,
  } as ExtractActionParameters<T>
})

function absolutePath(type: ContentType, ...pathSegments: string[]) {
  return join(process.cwd(), 'content', type, ...pathSegments)
}

export function listSlugs(type: ContentType) {
  const path = absolutePath(type)
  return fs.readdirSync(path).map((fileName) => fileName.replace(/\.md$/, ''))
}

export function firstParameter(params?: string | string[]) {
  return Array.isArray(params) ? params?.[0] : params
}

function hasImage(content: any): content is ContentWithImage {
  return (content as ContentWithImage).image !== undefined
}

function isBok(content: Content): content is BookContent {
  return content?.type === 'boecker'
}

function isFörfattare(content: Content): content is AuthorContent {
  return content?.type === 'foerfattare'
}

function isStartsida(content: Content): content is IndexContent {
  return content?.type === ''
}
