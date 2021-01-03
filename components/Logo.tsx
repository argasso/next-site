import React from 'react'
import ArgassoLogo from '../assets/svg/Argassologga.svg'

interface Props {
  color?: 'white' | 'black' | 'grey'
  className?: string
}

const style = {
  white: {
    filter:
      'invert(100%) sepia(0%) saturate(2%) hue-rotate(89deg) brightness(117%) contrast(101%)',
  },
  grey: {
    filter:
      'invert(49%) sepia(5%) saturate(1006%) hue-rotate(182deg) brightness(89%) contrast(88%)',
  },
  black: {},
}

export default function Logo({ color = 'black', className = '' }: Props) {
  return <ArgassoLogo className={className} style={style[color]} />
}
