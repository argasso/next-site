export abstract class SortOption<T> {
  constructor(readonly title: string, readonly key: string) {}

  abstract sort(a: T, b: T): number
}
