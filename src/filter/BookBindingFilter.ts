import { BookContent } from '../../lib/markdownReader'
import bookCollection from '../cms/collections/bookCollection'
import { Filter } from './Filter'
import { getObjectField, getSelectField } from '../../lib/cmsHelper'
import { FilterParameter } from './FilterParameter'
export class BookBindingFilter extends Filter<BookContent> {
  constructor() {
    const detailsField = getObjectField('generalDetails', bookCollection.fields)
    const bindingField = getSelectField('binding', detailsField.fields)
    const title = bindingField?.label || bindingField.name
    const key = bindingField.name
    const parameters =
      bindingField?.options
        .sort()
        .map((o) => new FilterParameter(o.toString(), o.toString(), key)) || []
    super(title, key, parameters)
  }

  isMatchingItem(item: BookContent, criteria: string) {
    return item.data.generalDetails?.binding === criteria
  }
}
