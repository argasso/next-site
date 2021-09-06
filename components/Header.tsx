import React from 'react'
import { H1 } from './Html'

export const Header = ({ title = 'This is the default title' }) => (
  <header className=" text-white">
    <div className="container">
      <H1>{title}</H1>
      <p>Alla våra böcker</p>
    </div>
  </header>
)
