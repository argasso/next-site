import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import memoized from 'nano-memoize'
import { Author, Book, Category, StartPage } from '../src/types/netlify-types'

export type BookContent = {
  type: 'boecker'
  data: Book
  slug: string
  meta?: {
    författare: AuthorContent[]
    kategorier: string[]
  }
}

export type AuthorContent = {
  type: 'foerfattare'
  data: Author
  slug: string
  meta?: {
    böcker: BookContent[]
  }
}

type MenysidorContent = {
  type: 'kategorier'
  data: Category
  slug: string
  meta?: {}
}

type IndexContent = {
  type: ''
  data: StartPage
  slug: string
  meta?: {
    böcker: Record<string, BookContent>
  }
}

export type Content =
  | BookContent
  | AuthorContent
  | IndexContent
  | MenysidorContent

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
      return readContent('foerfattare', authorSlug)
    })
    content.meta = {
      författare,
      kategorier: [],
    }
  } else if (isFörfattare(content)) {
    const böcker = listContent('boecker').filter((bok) =>
      bok.data.author.includes(content.slug)
    )

    content.meta = {
      böcker,
    }
  } else if (isStartsida(content)) {
    const slugs = content.data.kommande.map((kommande) => kommande.bok)
    const böcker = listContent('boecker')
      .filter((bok) => slugs.includes(bok.slug))
      .reduce<Record<string, BookContent>>((map, bok) => {
        map[bok.slug] = bok
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

  // if (hasImage(data) && data.image) {
  //   const imagePath = join('.', 'public', data.image)
  //   if (fs.existsSync(imagePath)) {
  //     const { width, height } = sizeOf(imagePath)
  //     data.imageWidth = width
  //     data.imageHeight = height
  //   }
  // }

  //data.slug = slug
  data.body = body

  return {
    type,
    data,
    slug,
  } as ExtractActionParameters<T>
})

function absolutePath(type: ContentType, ...pathSegments: string[]) {
  return path.join(process.cwd(), 'content', type, ...pathSegments)
}

export function listSlugs(type: ContentType) {
  const path = absolutePath(type)
  return fs
    .readdirSync(path)
    .map((fileName) => fileName.replace(/\.(md|mdx)$/, ''))
}

export function firstParameter(params?: string | string[]) {
  return Array.isArray(params) ? params?.[0] : params
}

// function hasImage(content: any): content is ContentWithImage {
//   return (content as ContentWithImage).image !== undefined
// }

function isBok(content: Content): content is BookContent {
  return content?.type === 'boecker'
}

function isFörfattare(content: Content): content is AuthorContent {
  return content?.type === 'foerfattare'
}

function isStartsida(content: Content): content is IndexContent {
  return content?.type === ''
}

export function getFiles(type: ContentType) {
  const prefixPaths = absolutePath(type)
  const files = getFilesPathsRecursively(prefixPaths)
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file) => path.parse(file).dir)
}

const getFilesPathsRecursively = (
  directory: string,
  origin?: string
): string[] =>
  fs.readdirSync(directory).reduce<string[]>((files, file) => {
    const absolute = path.join(directory, file)
    // console.log('readdir', directory, file, absolute)
    return [
      ...files,
      ...(fs.statSync(absolute).isDirectory()
        ? getFilesPathsRecursively(absolute, origin || directory)
        : [path.relative(origin || directory, absolute)]),
    ]
  }, [])
