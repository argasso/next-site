export interface ContentWithImage {
  image?: string
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

export type BookData = ContentWithImage & {
  title: string
  author: string[]
  isbn: string
  price?: number
  published: boolean
  discontinued: boolean
  shortDescription?: string
  generalDetails?: GeneralDetails
  translationDetails?: TranslationDetails
  audioDetails?: AudioDetails
}

export type AuthorData = ContentWithImage & {
  name: string
  published: boolean
}
