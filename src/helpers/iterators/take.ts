export default function take<T>(iterable: Iterable<T>, count: number)
  : IterableIterator<T> {
  const iter = iterable[Symbol.iterator]();
  let cursor = 0;

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      if (cursor >= count) {
        return { value: undefined, done: true }
      }

      cursor++;
      return iter.next();
    }
  }
}
