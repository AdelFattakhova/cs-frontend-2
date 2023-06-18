export default function random(min: number, max: number)
  : IterableIterator<number> {

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      return {
        value: Math.floor(Math.random() * (max - min) + min),
        done: false
      };
    }
  }
}
