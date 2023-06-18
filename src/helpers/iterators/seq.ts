export default function seq<T>(...iterables: Iterable<any>[])
  : IterableIterator<T> {

  let cursor = 0;
  let currIter = iterables[cursor][Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next(): IteratorResult<T> {
      let currNext = currIter?.next();

      if (cursor < iterables.length) {
        if (currNext.done) {
          cursor++;
          currIter = iterables[cursor]?.[Symbol.iterator]();
          return this.next();
        } else {
          return currNext;
        }
      }

      return { value: undefined, done: true };
    }
  }
}
