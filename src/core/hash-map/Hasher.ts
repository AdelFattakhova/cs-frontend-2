const getHashCode = Symbol();
const hashCode = Symbol();

export default class Hasher {
  capacity;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  getHash(key: any) {
    switch (typeof key) {
      case 'number':
        return key % this.capacity;
      case 'string':
        return this.#stringHash(key);
      case 'object':
        if (Array.isArray(key)) {
          return this.#arrayHash(key);
        }

        if (!(getHashCode in key)) {
          Object.defineProperty(key, getHashCode, {
            value() {
              if (!(hashCode in key)) {
                Object.defineProperty(key, hashCode, {
                  value: Math.floor(Math.random() * 2 ** 32 - 1)
                });
              }

              return key[hashCode];
            }
          });
        }

        return key[getHashCode]() % this.capacity;

      default:
        throw new TypeError('Invalid key type');
    }
  }

  #stringHash(string: string): number {
    let hash = string.charCodeAt(0);
    const stringLength = string.length;

    for (let i = 1; i < stringLength; i++) {
      const partial = hash * 128 + string.charCodeAt(i);
      hash = partial % stringLength;
    }

    return hash % this.capacity;
  }

  #arrayHash(array: any[]): number {
    let hash = this.getHash(array[0]);

    for (let i = 1; i < array.length; i++) {
      const hashPart = hash * array.length + this.getHash(array[i]);
      hash += hashPart % array.length;
    }

    return hash % this.capacity;
  }
}
