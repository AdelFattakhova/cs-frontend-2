import Hasher from './Hasher';

import { getNextPrime } from '../../helpers/prime-numbers';
import { compareArrays } from '../../helpers/compare-arrays';

export default class HashMap {
  #hasher: Hasher;
  #capacity = 11;
  buffer;
  length = 0;
  loadFactor = 0;

  constructor(hasher: any, capacity?: number) {
    if (capacity !== undefined) {
      this.#capacity = getNextPrime(capacity);
    }

    this.#hasher = new hasher(this.#capacity);
    this.buffer = new Array(this.#capacity).fill(null);
  }

  #doubleHash(index: number) {
    return 5 - index % 5;
  }

  #expandBuffer() {
    this.#capacity = getNextPrime(this.#capacity * 2);

    const oldBuffer = this.buffer;
    this.length = 0;
    this.buffer = new Array(this.#capacity).fill(null);

    oldBuffer.forEach((item) => {
      if (item) {
        this.set(item[0], item[1]);
      }
    });
  }

  getCapacity() {
    return this.#capacity;
  }

  set(key: number | string | object, value: any) {
    if (this.has(key)) return;

    let index = this.#hasher.getHash(key);
    const tryStep = this.#doubleHash(index);

    while (this.buffer[index] != null && this.buffer[index][0] !== -1) {
      index += tryStep;
      index %= this.#capacity;
    }

    this.buffer[index] = [key, value];
    this.length++;
    this.loadFactor = this.length / this.#capacity;

    if (this.loadFactor >= 0.75) {
      this.#expandBuffer();
    }
  }

  get(key: number | string | object) {
    let index = this.#hasher.getHash(key);
    const tryStep = this.#doubleHash(index);

    while (this.buffer[index] !== null && this.buffer[index][0] !== -1) {
      if (Array.isArray(key)) {
        if (compareArrays(this.buffer[index][0], key)) {
          return this.buffer[index][1];
        }
      } else {
        if (this.buffer[index][0] === key) {
          return this.buffer[index][1];
        }
      }

      index += tryStep;
      index %= this.#capacity;
    }

    return null;
  }

  has(key: number | string | object) {
    let index = this.#hasher.getHash(key);
    const tryStep = this.#doubleHash(index);

    while (this.buffer[index] !== null && this.buffer[index][0] !== -1) {
      if (Array.isArray(key)) {
        if (compareArrays(this.buffer[index][0], key)) {
          return true;
        }
      } else {
        if (this.buffer[index][0] === key) {
          return true;
        }
      }

      index += tryStep;
      index %= this.#capacity;
    }

    return false;
  }

  delete(key: number | string | object) {
    let index = this.#hasher.getHash(key);
    const tryStep = this.#doubleHash(index);
    let deleted;

    while (this.buffer[index] !== null && this.buffer[index][0] !== -1) {
      if (Array.isArray(key) && (compareArrays(this.buffer[index][0], key))
        || (this.buffer[index][0] === key)) {

        deleted = this.buffer[index][1];

        this.buffer[index][0] = -1;
        this.length--;
        this.loadFactor = this.length / this.#capacity;

        return deleted;
      }

      index += tryStep;
      index %= this.#capacity;
    }
  }
}
