export default class Vector {
  size = 0;
  capacity = 10;

  #buffer: Uint8Array | Uint16Array | Uint32Array | Int8Array
    | Int16Array | Int32Array | Uint8ClampedArray;
  #typedArray: Uint8ArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor
    | Int8ArrayConstructor | Int16ArrayConstructor | Int32ArrayConstructor
    | Uint8ClampedArrayConstructor;

  constructor(typedArray: any, options: Record<string, unknown> = {}) {
    if (typeof options.capacity === 'number') {
      this.capacity = options.capacity;
    }

    this.#typedArray = typedArray;
    this.#buffer = new typedArray(this.capacity);
  }

  #expandBuffer() {
    this.capacity *= 2;

    const oldBuffer = this.#buffer;
    this.#buffer = new this.#typedArray(this.capacity);

    for (let i = 0; i < oldBuffer.length; i++) {
      this.#buffer[i] |= oldBuffer[i];
    }
  }

  push(...values: number[]) {
    if ((this.size + values.length) >= this.capacity) {
      this.#expandBuffer();
    }

    values.forEach((value) => {
      this.#buffer[this.size++] |= value;
    });

    return this.size;
  }

  pop() {
    const popped = this.#buffer[this.size - 1];

    this.#buffer[this.size - 1] &= 0;
    this.size--;

    return popped;
  }

  unshift(...values: number[]) {
    if ((this.size + values.length) >= this.capacity) {
      this.#expandBuffer();
    }

    const oldBuffer = this.#buffer;
    this.#buffer = new this.#typedArray(this.capacity);

    for (let i = values.length; i < oldBuffer.length; i++) {
      this.#buffer[i] |= oldBuffer[i - values.length];
    }

    values.forEach((value, index) => {
      this.#buffer[index] |= value;
    });

    this.size += values.length;

    return this.size;
  }

  shift() {
    const shifted = this.#buffer[0];
    this.#buffer[0] &= 0;

    for (let i = 1; i < this.size; i++) {
      const movedItem = this.#buffer[i];
      this.#buffer[i - 1] = movedItem;
      this.#buffer[i] &= 0;
    }

    this.size--;

    return shifted;
  }
}
