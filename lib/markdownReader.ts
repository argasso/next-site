import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { AuthorData, BookData, ContentWithImage } from '../interfaces'
import sizeOf from 'image-size'

export type Content =
  | {
      type: 'boecker'
      data: BookData
      content: string
      slug: string
    }
  | {
      type: 'foerfattare'
      data: AuthorData
      content: string
      slug: string
    }

type ContentType = Content['type']
type ExcludeTypeField<A> = { [K in Exclude<keyof A, 'type'>]: A[K] }
export type ExtractActionParameters<T> = ExcludeTypeField<
  Extract<Content, { type: T }>
>

export function listContent<T extends ContentType>(
  type: T
): ExtractActionParameters<T>[] {
  return listSlugs(type).map((slug) => getContent(type, slug))
}

function hasImage(content: any): content is ContentWithImage {
  return (content as ContentWithImage).image !== undefined
}

export function getContent<T extends ContentType>(
  type: T,
  slug?: string | string[]
): ExtractActionParameters<T> {
  const singleSlug = Array.isArray(slug) ? slug?.[0] : slug
  const filePath = absolutePath(type, `${singleSlug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  if (hasImage(data) && data.image) {
    const imagePath = join('.', 'public', data.image)
    if (fs.existsSync(imagePath)) {
      const { width, height } = sizeOf(imagePath)
      data.imageWidth = width
      data.imageHeight = height
    }
  }

  return {
    data,
    content,
    slug: singleSlug,
  } as ExtractActionParameters<T>
}

function absolutePath(type: ContentType, ...pathSegments: string[]) {
  return join(process.cwd(), 'content', type, ...pathSegments)
}

export function listSlugs(type: ContentType) {
  const path = absolutePath(type)
  return fs.readdirSync(path).map((fileName) => fileName.replace(/\.md$/, ''))
}
