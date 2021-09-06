import React, {
  useCallback,
  useEffect,
  useState,
  FC,
  MouseEventHandler,
} from 'react'
import { useEmblaCarousel } from 'embla-carousel/react'
// import Image from 'next/image'
import Img from 'react-cool-img'
import styles from './CarouselEmbla.module.css'
import { StartPage } from '../src/types/netlify-types'

export default function CarouselEmbla({ banners }: Pick<StartPage, 'banners'>) {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  )

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    setScrollSnaps(embla.scrollSnapList())
    embla.on('select', onSelect)
  }, [embla, setScrollSnaps, onSelect])

  return (
    <>
      <div className={styles.embla}>
        <div className={styles.embla__viewport} ref={viewportRef}>
          <div className={styles.embla__container}>
            {banners.map((banner, index) => (
              <div className={styles.embla__slide} key={index}>
                <div className={styles.embla__slide__inner}>
                  <Img
                    src={banner.image}
                    className={styles.embla__slide__img}
                  ></Img>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
      <div className={styles.embla__dots}>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </>
  )
}

interface DotButtonProps {
  selected: boolean
  onClick: MouseEventHandler
}

export const DotButton: FC<DotButtonProps> = ({ selected, onClick }) => (
  <button
    className={`${styles.embla__dot} ${selected ? 'is-selected' : ''}`}
    type="button"
    onClick={onClick}
  />
)

interface NavButtonProps {
  enabled: boolean
  onClick: MouseEventHandler
}

export const PrevButton: FC<NavButtonProps> = ({ enabled, onClick }) => (
  <button
    className={`${styles.embla__button} ${styles.embla__button__prev}`}
    onClick={onClick}
    disabled={!enabled}
  >
    <svg
      className={styles.embla__button__svg}
      viewBox="137.718 -1.001 366.563 644"
    >
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
)

export const NextButton: FC<NavButtonProps> = ({ enabled, onClick }) => (
  <button
    className={`${styles.embla__button} ${styles.embla__button__next}`}
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className={styles.embla__button__svg} viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
)
