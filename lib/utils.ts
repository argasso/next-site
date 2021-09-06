export function asArray(value?: string | string[]): string[] {
  const nonNull = value || []
  return Array.isArray(nonNull) ? nonNull : [nonNull]
}
