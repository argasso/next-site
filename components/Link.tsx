import React from 'react'
import NextLink, { LinkProps } from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { UrlObject } from 'url'

type Props = React.PropsWithChildren<LinkProps & { className?: string }>

export default function Link({ href, className, children, ...rest }: Props) {
  const router = useRouter()
  const absoluteHref = makeAbsolute(href, router)
  return (
    <NextLink href={absoluteHref} {...rest}>
      <a className={className}>{children}</a>
    </NextLink>
  )
}

function makeAbsolute(
  href: string | UrlObject,
  router: NextRouter
): string | UrlObject {
  if (typeof href === 'string') {
    return href.startsWith('/') ? href : `${router.pathname}/${href}`
  }
  return href
}
