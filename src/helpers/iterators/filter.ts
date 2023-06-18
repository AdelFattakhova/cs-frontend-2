export default function filter<T>(iterable: Iterable<T>, predicate: Function)
  : IterableIterator<T> {

  const iter = iterable[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next(): IteratorResult<T, any> {
      const current = iter.next();

      if (current.done || predicate(current.value)) {
        return current;
      }

      return this.next();
    }
  }
}
