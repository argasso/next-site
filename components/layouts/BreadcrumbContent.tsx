import React, { FC } from 'react'
import Breadcrumbs from '../Breadcrumbs'

export const BreadcrumbContent: FC = ({ children }) => (
  <>
    <div>
      <Breadcrumbs className="text-gray-400" rootName="Argasso" />
    </div>
    <div className="mt-4 min-h-screen">{children}</div>
  </>
)
