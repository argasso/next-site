import React from 'react'
// import NextImage from 'next/image'
import { domain } from '../siteconfig.json'
import { ContentWithImage } from '../interfaces'

const DEFAULT_WIDTH = 200
const DEFAULT_HEIGHT = 330

const sizeFactors = {
  small: 1,
  large: 4,
}

type Props = {
  image: ContentWithImage
  size: 'small' | 'large'
}

export default function Image({ image, size = 'small' }: Props) {
  const width = sizeFactors[size] * DEFAULT_WIDTH
  let height = sizeFactors[size] * DEFAULT_HEIGHT
  if (image.imageWidth && image.imageHeight) {
    const resizeFactor = width / image.imageWidth
    height = Math.round(image.imageHeight * resizeFactor)
  }

  return (
    <div className="relative" style={{ width, height }}>
      <img
        src={`http://${domain}${image.image}?nf_resize=fit&w=${width}`}
        alt=""
        width={width}
        height={height}
      />
    </div>
  )
}
