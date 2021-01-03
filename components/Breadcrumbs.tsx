import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import Link from './Link'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const unSlug = (slug: string) => {
  return slug
    .replace(/-/g, ' ')
    .replace(/aa/g, 'å')
    .replace(/ae/g, 'ä')
    .replace(/oe/g, 'ö')
    .replace(/ue/g, 'ü')
    .toLowerCase()
}

interface Props {
  rootName: string
  className?: string
}

export default function Breadcrumbs({ rootName, className = '' }: Props) {
  const router = useRouter()

  const breadcrumbs = useMemo(() => {
    if (router) {
      const pathElements = router.asPath.split('/')
      pathElements.shift()

      const pathArray = pathElements.map((pathElement, i) => {
        return {
          pathElement,
          href: '/' + pathElements.slice(0, i + 1).join('/'),
        }
      })

      return pathArray
    }
  }, [router])

  if (!breadcrumbs) {
    return null
  }

  return (
    <nav aria-label="breadcrumbs">
      <ol className={`flex breadcrumbs ${className}`}>
        <li>
          {/* <FontAwesomeIcon
            className="mr-2"
            icon={faMapMarkerAlt}
          ></FontAwesomeIcon> */}
          <Link href="/" className={className}>
            {rootName}
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb) => (
          <li
            key={breadcrumb.href}
            className="capitalize ml-3 pl-2"
            style={{ listStyle: "'/' outside" }}
          >
            <Link href={breadcrumb.href} className={className}>
              {unSlug(breadcrumb.pathElement)}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
