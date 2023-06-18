export default function mapSeq<T>(
  iterable: Iterable<any>,
  mapIterable: Iterable<Function>)
  : IterableIterator<T> {

  const iter = iterable[Symbol.iterator]();
  let mappingIter = mapIterable[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      const { value: iterValue, done } = iter.next();
      if (done) {
        return { value: undefined, done: true };
      }

      let mapFunc = mappingIter.next();
      let mappedValue = iterValue;

      while (!mapFunc.done) {
        mappedValue = mapFunc.value(mappedValue);
        mapFunc = mappingIter.next();
      }
      mappingIter = mapIterable[Symbol.iterator]();

      return {
        value: mappedValue,
        done: false,
      }
    }
  }
}
