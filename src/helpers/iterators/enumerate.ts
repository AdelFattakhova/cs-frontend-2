export default function enumerate<T>(iterable: Iterable<T>)
  : IterableIterator<T> {

  const iter = iterable[Symbol.iterator]();
  let cursor = -1;

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      const { value, done } = iter.next();
      cursor++;
      return {
        value: done ? undefined : [cursor, value],
        done
      } as IteratorResult<T>;
    }
  }
}
