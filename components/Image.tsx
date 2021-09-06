import React from 'react'
import Img from 'react-cool-img'
import { placeholderSrc } from '../lib/imageHelper'
// import NextImage, { ImageLoader } from 'next/image'

const DEFAULT_WIDTH = 200
const DEFAULT_HEIGHT = 320

const sizeFactors = {
  small: 1,
  large: 4,
}

type Props = {
  image?: string
  size: 'small' | 'large'
  alt?: string
  className?: string
}

//const myLoader: ImageLoader = ({ src, width }) => {
//  return `${src}?nf_resize=fit&w=${width}`
//}

export default function Image({
  image,
  size = 'small',
  alt = '',
  className,
}: Props) {
  const width = sizeFactors[size] * DEFAULT_WIDTH
  let height = sizeFactors[size] * DEFAULT_HEIGHT
  //if (image.imageWidth && image.imageHeight) {
  //  const resizeFactor = width / image.imageWidth
  //  height = Math.round(image.imageHeight * resizeFactor)
  //}
  const src = image
    ? `${image}?nf_resize=fit&w=${width}`
    : placeholderSrc(width, height)
  return (
    <Img
      placeholder={placeholderSrc(width, height)}
      src={src}
      alt={alt}
      width={width}
      // height={height}
      className={className}
    />
    //<NextImage
    //  loader={myLoader}
    //  src={image.image}
    //  width={width}
    //  height={height}
    //  className={className}
    //  alt={alt}
    ///>
  )
}
