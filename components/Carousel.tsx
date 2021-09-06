import React, { useEffect, useRef, useState } from 'react'
import { StartPage } from '../src/types/netlify-types'
// import Img from 'react-cool-img'

export default function Carousel({ banners }: Pick<StartPage, 'banners'>) {
  const [current, setCurrent] = useState(0)

  const size = banners.length
  const refArray = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(next(current, size))
      console.log('This will run every second!')
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="carousel relative container mx-auto"
      style={{ maxWidth: 1600 }}
    >
      <div className={`carousel-inner relative overflow-hidden w-full`}>
        {banners.map((banner, index) => (
          <>
            <input
              ref={(ref) => {
                refArray.current[index] = ref // took this from your guide's example.
              }}
              className="carousel-open"
              type="radio"
              id={`carousel-${index}`}
              name="carousel"
              aria-hidden="true"
              hidden
              // checked
              defaultChecked={index === current}
            />
            <div
              className="carousel-item absolute opacity-0"
              style={{ height: '300px' }}
            >
              <div
                className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right"
                style={{
                  backgroundImage: `url(${banner.image})`,
                }}
              >
                <div className="container mx-auto">
                  <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                    <p className="text-black text-2xl my-4">{banner.name}</p>
                    <a
                      className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
                      href="#"
                    >
                      view product
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <label
              htmlFor={`carousel-${prev(index, size)}`}
              className="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
            >
              ‹
            </label>
            <label
              htmlFor={`carousel-${next(index, size)}`}
              className="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
            >
              ›
            </label>
          </>
        ))}

        <ol className="carousel-indicators">
          {banners.map((banner, index) => (
            <li
              key={`indicator-${index}-${banner.name}`}
              className="inline-block mr-3"
            >
              <label
                htmlFor={`carousel-${index}`}
                className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900"
              >
                •
              </label>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

// function curr(index: number) {
//   return index + 1
// }

function next(index: number, size: number) {
  return (index + 1) % size
}

function prev(index: number, size: number) {
  return (index + size - 1) % size
}
