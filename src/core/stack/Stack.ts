export default class Stack {
  array: any;
  headIndex = -1;
  head: number | string | [any, any] | null = null;
  maxSize: number;

  constructor(stackSize: number) {
    this.array = new Array(stackSize);
    this.maxSize = stackSize;
  }

  isEmpty() {
    return this.headIndex === -1;
  }

  isFull() {
    return this.headIndex === this.maxSize - 1;
  }

  peek() {
    return this.head;
  }

  push(value: number | string | [any, any]) {
    if (this.isFull()) {
      throw new Error('Stack is full');
    }

    this.headIndex++;
    this.head = value;

    this.array[this.headIndex] = value;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }

    const deleted = this.array[this.headIndex];

    this.headIndex--;

    if (this.headIndex === -1) {
      this.head = null;
    } else {
      this.head = this.array[this.headIndex];
    }

    return deleted;
  }
}
