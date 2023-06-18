export default function zip<T>(...iterables: Iterable<any>[])
  : IterableIterator<T> {

  const innerIters = [...iterables.map((iter) => iter[Symbol.iterator]())];

  return {
    [Symbol.iterator]() {
      return this;
    },

    next(): IteratorResult<T> {
      const nextValue = [];
      for (let i = 0; i < iterables.length; i++) {
        const next = innerIters[i].next();
        if (next.done) {
          return { value: undefined, done: true };
        }
        nextValue.push(next.value);
      }
      return {
        value: nextValue,
        done: false,
      } as IteratorResult<T>;
    }
  }
}
