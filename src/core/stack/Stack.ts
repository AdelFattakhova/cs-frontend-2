export default class Stack {
  array: any;
  headIndex = -1;
  head: number | string | null = null;
  maxSize: number;
  typeOfArray: string | undefined;

  constructor(typedArrayConstructor: any, stackSize: number) {
    this.array = new typedArrayConstructor(stackSize);
    this.maxSize = stackSize;
  }

  isEmpty() {
    return this.headIndex === -1;
  }

  isFull() {
    return this.headIndex === this.maxSize - 1;
  }

  push(value: number | string) {
    if (this.isFull()) {
      throw new Error('Stack is full');
    }

    if (!this.typeOfArray) {
      this.typeOfArray = typeof value;

    } else if (this.typeOfArray !== typeof value) {
      throw new Error('Type of new value does not match with type of data in stack');
    }

    if (typeof value === 'string' && value.length > 1) {
      throw new Error('Cannot add more than 1 string character');
    }

    this.headIndex++;
    this.head = value;

    this.array[this.headIndex]
      |= typeof value === 'string' ? value.charCodeAt(0) : value;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }

    const deleted = (this.typeOfArray === 'string')
      ? String.fromCharCode(this.array[this.headIndex])
      : this.array[this.headIndex];

    this.headIndex--;

    if (this.headIndex === -1) {
      this.head = null;
    } else if (this.typeOfArray === 'string') {
      this.head = String.fromCharCode(this.array[this.headIndex]);
    } else {
      this.head = this.array[this.headIndex];
    }

    return deleted;
  }
}
