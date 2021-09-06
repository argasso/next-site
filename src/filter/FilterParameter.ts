import { ParsedUrlQuery } from 'querystring'
import { asArray } from '../../lib/utils'

export class FilterParameter {
  public count? = 0
  private parameters: FilterParameter[] = []
  constructor(
    readonly label: string,
    readonly value: string,
    readonly key: string
  ) {}

  addParameter(parameter: FilterParameter) {
    this.parameters.push(parameter)
  }

  hasParameters() {
    return this.parameters.length > 0
  }

  getParameters() {
    return this.parameters
  }

  isSelected(query: ParsedUrlQuery) {
    return asArray(query[this.key]).includes(this.value)
  }
}
