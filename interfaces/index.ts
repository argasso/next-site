export interface ContentWithSlug {
  slug: string
}

export interface ContentWithImage {
  image: string
  imageWidth?: number
  imageHeight?: number
}

// export interface Content<T> {
//   content: string
//   data: T
//   isEmpty: boolean
//   excerpt: string
// }

export interface GeneralDetails {
  illustrations?: string
  publishMonth?: string
  binding?: string
  age?: string
  numPages?: string
}

export interface TranslationDetails {
  translator?: string
  originalTitle?: string
  contains?: string
}

export interface AudioDetails {
  duration?: string
  reciter?: string
}

export type BookData = ContentWithSlug &
  ContentWithImage & {
    title: string
    author: string[]
    isbn: string
    price?: number
    published: boolean
    discontinued: boolean
    shortDescription?: string
    body?: string
    generalDetails?: GeneralDetails
    translationDetails?: TranslationDetails
    audioDetails?: AudioDetails
  }

export type AuthorData = ContentWithSlug &
  ContentWithImage & {
    name: string
    published: boolean
    body?: string
  }

export type Startsida = {
  title: string
  intro: string
  banners: {
    name: string
    image: string
  }[]
  kommande: {
    bok: string
    text: string
  }[]
}
