// import { Transition } from '@tailwindui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Link from './Link'
import Logo from './Logo'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import styles from './TopNav.module.css'

// function useEvent<K extends keyof WindowEventMap>(
//   event: K,
//   handler: (this: Window, ev: WindowEventMap[K]) => any,
//   passive = false
// ) {
//   useEffect(() => {
//     window.addEventListener(event, handler, passive)
//     return function cleanup() {
//       window.removeEventListener(event, handler)
//     }
//   })
// }

const ActiveLink: React.FC<{ href: string; className?: string }> = ({
  href,
  className = '',
  children,
}) => {
  const router = useRouter()
  return router.asPath === href ? (
    <div className={`${className} text-white flex m-1 px-3 mt-2 border-b-4`}>
      <span className="my-auto">{children}</span>
    </div>
  ) : (
    <Link
      href={href}
      className={`${className} text-white flex m-1 px-3 rounded-md ${styles.link}`}
    >
      <span className="my-auto">{children}</span>
    </Link>
  )
}

const TopNav = () => {
  const [open, setOpen] = useState(false)

  const [className, setClassName] = useState('ease-inx')

  useScrollPosition(
    ({ currPos }) => {
      const isScrolled = currPos.y < 0
      const scrollClassName = isScrolled
        ? 'ease-outx bg-red-700 bg-opacity-95 shadow-md backdrop-filterx backdrop-blur-smx'
        : 'gradient'

      if (scrollClassName === className) return

      setClassName(scrollClassName)
    },
    [className]
  )

  return (
    <nav
      className={`sticky top-0 z-50 text-white transition-allx duration-200x ease-inx ${className}`}
    >
      <div className="container opacity-100 flex items-stretch justify-between h-14">
        <div className="flex items-stretch">
          <ActiveLink href="/" className="pl-0 pr-0 mr-2">
            <Logo color="white" className="w-28 h-10" />
          </ActiveLink>
          <div className="hidden md:flex">
            <ActiveLink href="/boecker">Böcker</ActiveLink>
            <ActiveLink href="/information">Information</ActiveLink>
            <ActiveLink href="/studiematerial">Studiematerial</ActiveLink>
          </div>
        </div>
        <div className="my-auto hidden md:block">
          <div className="ml-4 flex items-center md:ml-6">
            <button
              className="p-1 border-2 mx-auto border-transparent text-gray-100 rounded-full hover:text-white  hover:bg-red-900 focus:outline-none focus:text-white focus:bg-red-900"
              aria-label="Search"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="-mr-2 flex md:hidden">
          {/* <!-- Mobile menu button --> */}
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white hover:bg-red-900 focus:bg-red-900 focus:text-white"
            onClick={() => setOpen(!open)}
          >
            <svg
              className={`${open ? 'hidden' : 'block'} h-6 w-6`}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className={`${open ? 'block' : 'hidden'} h-6 w-6`}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className={`${open ? 'block' : 'hidden'} md:hidden `}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Dashboard
          </a>

          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Team
          </a>

          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Projects
          </a>

          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Calendar
          </a>

          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Reports
          </a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5 space-x-3">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="space-y-1">
              <div className="text-base font-medium leading-none text-white">
                Tom Cook
              </div>
              <div className="text-sm font-medium leading-none text-gray-400">
                tom@example.com
              </div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
            >
              Your Profile
            </a>

            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
            >
              Settings
            </a>

            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default TopNav
