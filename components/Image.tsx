import React from 'react'
import { ContentWithImage } from '../interfaces'
import Img from 'react-cool-img'

const DEFAULT_WIDTH = 200
const DEFAULT_HEIGHT = 320

const sizeFactors = {
  small: 1,
  large: 4,
}

type Props = {
  image: ContentWithImage
  size: 'small' | 'large'
  alt?: string
}

const placeholderSrc = (width: number, height: number) =>
  `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`

export default function Image({ image, size = 'small', alt = '' }: Props) {
  const width = sizeFactors[size] * DEFAULT_WIDTH
  let height = sizeFactors[size] * DEFAULT_HEIGHT
  if (image.imageWidth && image.imageHeight) {
    const resizeFactor = width / image.imageWidth
    height = Math.round(image.imageHeight * resizeFactor)
  }

  return (
    <Img
      placeholder={placeholderSrc(width, height)}
      src={`${image.image}?nf_resize=fit&w=${width}`}
      alt={alt}
      width={width}
      height={height}
    />
  )
}
