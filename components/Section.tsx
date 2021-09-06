import React, { FC } from 'react'

type Props = {
  title: string
  color?: 'gray' | 'white' | 'green'
}
const colors = {
  gray: 'bg-gray-100 outline-gray-100',
  white: 'bg-white outline-white',
  green: 'bg-green-50 outline-green-50',
}
export const Section: FC<Props> = ({ title, color = 'white', children }) => (
  <section className={`py-8 ${colors[color]}`}>
    <div className="container">
      <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
        {title}
      </h2>
      <div className="w-full mb-12">
        <div className="h-1 mx-auto gradient w-72 opacity-75 my-0 py-0 rounded-t-3xl"></div>
      </div>
      {children}
    </div>
  </section>
)
