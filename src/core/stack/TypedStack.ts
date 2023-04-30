import Stack from "./Stack";

export default class TypedStack extends Stack {
  head: number | string | null = null;
  typeOfArray: string | undefined;

  constructor(typedArrayConstructor: any, stackSize: number) {
    super(stackSize);

    this.array = new typedArrayConstructor(stackSize);
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
