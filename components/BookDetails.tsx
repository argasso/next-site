import bookCollection from '../src/cms/collections/bookCollection'
import { Book } from '../src/types/netlify-types'
import type { CmsField } from 'netlify-cms-core'
import { isFieldMeta } from '../lib/cmsHelper'

const labels = reduceLabels(bookCollection.fields || [])

function reduceLabels(fields: CmsField[]): { [key: string]: string } {
  return (
    fields.reduce<{ [key: string]: string }>((acc, val) => {
      if (val?.widget === 'object' && !isFieldMeta(val)) {
        const subLabels = reduceLabels(val.fields)
        return { ...acc, ...subLabels }
      } else if (val.name && val.label) {
        acc[val.name] = val.label
      }
      return acc
    }, {}) || {}
  )
}

export function BookDetails({ attributes }: { attributes: Book }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3>Detaljer</h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {Object.entries({
            ...attributes.generalDetails,
            ...attributes.audioDetails,
            ...attributes.translationDetails,
          }).map((a, index) => (
            <div
              className={`${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
            >
              <dt className="text-sm font-medium text-gray-500">
                {labels[a[0]]}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {a[1]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
