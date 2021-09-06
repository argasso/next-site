/* eslint-disable */
/* tslint:disable */

export interface Category_seo {
  title?: string;
  description: string;
}

export interface Category {
  title: string;
  meny?: string;
  image?: string;
  seo: Category_seo;
}

export interface Author {
  name: string;
  published?: boolean;
  image?: string;
}

export type Book_generalDetails_binding_options = "Kartonnage" | "Häftad" | "Inbunden" | "Flexband" | "Danskt band" | "CD-bok";

export interface Book_generalDetails {
  illustrations?: string;
  manuscript?: string;
  publishMonth?: string;
  binding?: Book_generalDetails_binding_options;
  age?: string;
  numPages?: string;
}

export interface Book_translationDetails {
  translator?: string;
  originalTitle?: string;
  contains?: string;
}

export interface Book_audioDetails {
  duration?: string;
  reciter?: string;
}

export interface Book {
  title: string;
  author: string[];
  kategori?: string[];
  isbn: string;
  price?: number;
  published?: boolean;
  discontinued?: boolean;
  image?: string;
  shortDescription?: string;
  generalDetails?: Book_generalDetails;
  translationDetails?: Book_translationDetails;
  audioDetails?: Book_audioDetails;
}

export interface StartPage_banners {
  name: string;
  image: string;
}

export interface StartPage_kommande {
  bok: string;
  text: string;
}

export interface StartPage_seo {
  title?: string;
  description: string;
}

export interface StartPage {
  title: string;
  intro: string;
  banners: StartPage_banners[];
  kommande: StartPage_kommande[];
  seo: StartPage_seo;
}
