import React, { FC } from 'react'
import Breadcrumbs from '../Breadcrumbs'

export const MainContent: FC = ({ children }) => (
  <main className="bg-white">
    <div className="container">
      <div>
        <Breadcrumbs className="text-gray-500" rootName="Argasso" />
      </div>
      <div className="min-h-screen">{children}</div>
    </div>
  </main>
)
