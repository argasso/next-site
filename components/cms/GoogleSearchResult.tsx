import React from 'react'

export function GoogleSearchResult({
  title = 'Lorem ipsum dolor',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  path = 'exempel',
}) {
  return (
    <div className="">
      <p className="font-semibold text-2xl">
        Sökresultat på <span className="text-blue-600">G</span>
        <span className="text-red-700">o</span>
        <span className="text-yellow-400">o</span>
        <span className="text-blue-600">g</span>
        <span className="text-green-600">l</span>
        <span className="text-red-700">e</span>
      </p>
      <p className="text-gray-900 text-sm">
        https://www.argasso.se
        <span className="text-gray-600"> › {path}</span>
      </p>
      <h3 className="text-2xl text-blue-800">{title}</h3>
      <p className="text-sm text-gray-900">{description}</p>
    </div>
  )
}
