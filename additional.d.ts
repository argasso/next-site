declare module '*.svg' {
  import * as React from 'react'

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>

  export default ReactComponent
}

declare module '@mdx-js/react' {
  export const MDXProvider: any
}

declare module 'netlify-cms-widget-mdx' {
  import { ComponentType, PropsWithChildren, ReactElement } from 'react'
  import {
    CmsWidgetControlProps,
    CmsWidgetPreviewProps,
  } from 'netlify-cms-core'
  import { Plugin } from 'unified'

  export const MdxControl: ComponentType<CmsWidgetControlProps>
  export const MdxPreview: ComponentType<CmsWidgetPreviewProps>
  type Options = {
    components?: Record<
      string,
      | ComponentType
      | ((
          props: PropsWithChildren<{}>,
          context?: any
        ) => ReactElement<any, any> | null)
    >
    scope: any
    allowedImports?: any
    mdPlugins: Plugin[]
  }
  export function setupPreview(
    options: Options
  ): ComponentType<CmsWidgetPreviewProps>
}
declare module '*.md' {
  import React from 'react'
  const attributes: Record<string, unknown>
  const react: React.VFC
  export { attributes, react }
}
declare module 'nano-memoize' {
  export default function memoized<T extends Function>(
    func: T,
    options?: {
      /**
       * Only use the provided maxArgs for cache look-up, useful for ignoring final callback arguments
       */
      maxArgs?: number
      /**
       * Number of milliseconds to cache a result, set to `Infinity` to never create timers or expire
       */
      maxAge?: number
      /**
       * The serializer/key generator to use for single argument functions (optional, not recommended)
       * must be able to serialize objects and functions, by default a WeakMap is used internally without serializing
       */
      serializer?: (...args: any[]) => any
      /**
       * the equals function to use for multi-argument functions (optional, try to avoid) e.g. deepEquals for objects
       */
      equals?: (...args: any[]) => boolean
      /**
       * Forces the use of multi-argument paradigm, auto set if function has a spread argument or uses `arguments` in its body.
       */
      vargs?: boolean
    }
  ): T
}
