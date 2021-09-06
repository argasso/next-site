import React, { FC } from 'react'
type HProps = JSX.IntrinsicElements['h1']
export const H1: FC<HProps> = ({ children, className = '', ...rest }) => (
  <h1
    className={`my-4 text-5xl leading-tight font-serif ${className}`}
    {...rest}
  >
    {children}
  </h1>
)
export const H2: FC<HProps> = ({ children, className = '', ...rest }) => (
  <h2
    className={`my-2 text-3xl leading-tight font-serif ${className}`}
    {...rest}
  >
    {children}
  </h2>
)
export const H3: FC<HProps> = ({ children, className = '', ...rest }) => (
  <h3
    className={`my-1 text-xl leading-tight font-serif ${className}`}
    {...rest}
  >
    {children}
  </h3>
)
export const H4: FC<HProps> = ({ children, className = '', ...rest }) => (
  <h3
    className={`my-1 text-xl leading-tight font-serif ${className}`}
    {...rest}
  >
    {children}
  </h3>
)

type UlProps = JSX.IntrinsicElements['ul']
export const UL: FC<UlProps> = ({ children, className = '', ...rest }) => (
  <ul className={`list-disc list-inside pl-3 mb-3 ${className}`} {...rest}>
    {children}
  </ul>
)

export const Blockquote: FC = ({ children }) => {
  const quotes = React.Children.toArray(children)
  const cite = React.Children.count(children) > 1 ? quotes.pop() : null
  return (
    <blockquote className="relative p-5 pb-2 text-xl font-serif border-l-8 bg-neutral-100 text-gray-700 border-gray-200 quote">
      <div
        className="absolute -ml-4 -top-1 text-8xl text-gray-200 leading-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>
      <div className="relative font-serif italic">{quotes}</div>
      {cite && (
        <div className="flex align-baseline text-sm font-sans font-bold">
          <p className="flex-grow-0 mr-2" aria-hidden="true">
            &#8212;
          </p>
          <cite className="flex-grow not-italic">{cite}</cite>
        </div>
      )}
    </blockquote>
  )
}
type ImgProps = JSX.IntrinsicElements['img']
export const Img: FC<ImgProps> = ({ title, ...rest }) => {
  return (
    <div className="my-6">
      <img {...rest} />
      {title && <p className="text-gray-500">{title}</p>}
    </div>
  )
}

export const Button: FC<JSX.IntrinsicElements['button']> = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <button
      className={`${className} uppercase text-gray-800 font-semibold text-sm py-2 px-8 border border-gray-200`}
      {...rest}
    >
      {children}
    </button>
  )
}

export const Select: FC<JSX.IntrinsicElements['select']> = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <select
      className={`${className} uppercase text-gray-800 font-semibold text-sm py-2 px-8 border border-gray-200 rounded`}
      {...rest}
    >
      {children}
    </select>
  )
}
