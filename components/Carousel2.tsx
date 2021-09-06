import React from 'react'
import Img from 'react-cool-img'
import styles from './Carousel2.module.css'
import { placeholderSrc } from '../lib/imageHelper'
import { StartPage } from '../src/types/netlify-types'

function next(index: number, size: number) {
  return ((index + 1) % size) + 1
}

function prev(index: number, size: number) {
  return ((index + size - 1) % size) + 1
}

export default function Carousel({ banners }: Pick<StartPage, 'banners'>) {
  const size = banners.length
  return (
    <section className={styles.carousel} aria-label="Gallery">
      <img src={placeholderSrc(1100, 300)} />
      <ol className={styles.carousel__viewport}>
        {banners.map((banner, index) => (
          <li
            id={`carousel__slide${index + 1}`}
            tabIndex={0}
            className={styles.carousel__slide}
          >
            <Img
              // placeholder={placeholderSrc(width, height)}
              src={`${banner.image}?nf_resize=fit&w=1100`}
              alt={banner.name}
              // width={}
              // height={height}
              className=""
            />
            <div className={styles.carousel__snapper}>
              <a
                href={`#carousel__slide${next(index, size)}`}
                className={styles.carousel__prev}
              >
                Visa bild {next(index, size)}
              </a>
              <a
                href={`#carousel__slide${prev(index, size)}`}
                className={styles.carousel__next}
              >
                Visa bild {prev(index, size)}
              </a>
            </div>
          </li>
        ))}
      </ol>
      <aside className={styles.carousel__navigation}>
        <ol className={styles.carousel__navigation_list}>
          {banners.map((banner, index) => (
            <li key={banner.name} className={styles.carousel__navigation_item}>
              <a
                href={`#carousel__slide${index + 1}`}
                className={styles.carousel__navigation_button}
              >
                Visa bild {index + 1}
              </a>
            </li>
          ))}
        </ol>
      </aside>
    </section>
  )
}
