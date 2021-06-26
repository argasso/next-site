import React, { ReactNode } from 'react'
import Head from 'next/head'
import siteConfig from '../siteconfig.json'
import Breadcrumbs from './Breadcrumbs'
import TopNav from './TopNav'
import Logo from './Logo'
import Link from './Link'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div className="bg-yellow-50">
    <Head>
      <title>
        {siteConfig.title} - {title}
      </title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <TopNav />

    <header className="bg-red-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl px-3 font-extralight leading-tight text-red-100 mb-28">
          {title}
        </h1>
      </div>
    </header>

    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 -mt-32">
        <div className="bg-white shadow rounded-lg p-4 pt-2">
          <div>
            <Breadcrumbs className="text-gray-400" rootName="Argasso" />
          </div>
          <div className="mt-4 min-h-screen">{children}</div>
        </div>
      </div>
    </main>

    <footer className="bg-gray-800 text-gray-100 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap md:text-left text-center order-first">
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="text-lg title-font font-medium text-teal-400 tracking-widest text-sm mb-3">
              Kontaktuppgifter
            </h2>
            <nav className="list-none mb-10">
              <li className="mb-2 text-gray-500">
                Lasarettsgatan 12
                <br />
                89133 Örnsköldsvik
              </li>
              <li className="mb-2 text-gray-500">0660 - 27 36 40</li>
              <li className="mb-2 text-gray-500">info@argasso.se</li>
            </nav>
          </div>
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="text-lg title-font font-medium text-teal-400 tracking-widest text-sm mb-3">
              Villkor
            </h2>
            <nav className="list-none mb-10 text-gray-500">
              <li className="mb-2">
                <Link
                  href="/ntegritetspolicy"
                  className="text-gray-500 hover:text-gray-300"
                >
                  Försäljnings och leveransvilkor
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/integritetspolicy"
                  className="mb-2 text-gray-500 hover:text-gray-300"
                >
                  Policy för cookies
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/integritetspolicy"
                  className="mb-2 text-gray-500 hover:text-gray-300"
                >
                  Integritetspolicy
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="text-lg title-font font-medium text-teal-300 tracking-widest text-sm mb-3">
              Nyhetsbrev
            </h2>
            <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
              <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                <label
                  aria-labelledby="footer-field"
                  className="leading-7 text-sm text-gray-600"
                >
                  E-postadress
                </label>
                <input
                  type="text"
                  id="footer-field"
                  name="footer-field"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-red-200 focus:border-red-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-teal-400 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded">
                Prenumerera
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-gray-500">
        <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <Logo color="grey" className="w-32 h-16" />
          </a>
          <div className="text-sm sm:ml-6 sm:mt-0 mt-4">
            © 2020 Argasso —
            <a
              href="https://twitter.com/ArgassoBok"
              rel="noopener noreferrer"
              className="ml-1"
              target="_blank"
            >
              @ArgassoBok
            </a>
          </div>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a>
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  </div>
)

export default Layout
