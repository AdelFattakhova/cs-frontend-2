export default class BitAccessor {
  constructor(array: Uint8Array) {
    if (array.length === 0) {
      throw new Error('Array is empty');
    }

    this.array = array;
  }

  private array: Uint8Array;

  private validateParams(itemIndex: number, bitIndex: number, newBitValue?: number): void {
    if (itemIndex < 0 || itemIndex > this.array.length - 1) {
      throw new Error('Item index must be greater than 0 and lower than array length');
    }

    if (bitIndex < 0 || bitIndex > 7) {
      throw new Error('The bit index must be greater than 0 and lower than 8');
    }

    if (newBitValue && (newBitValue < 0 || newBitValue > 1)) {
      throw new Error('The bit value must be either 0 or 1');
    }
  }

  get(itemIndex: number, bitIndex: number): number {
    this.validateParams(itemIndex, bitIndex);

    const arrayItem = this.array[itemIndex];
    const searchedBit = arrayItem & (1 << bitIndex);

    return searchedBit === 0 ? 0 : 1;
  }

  set(itemIndex: number, bitIndex: number, newBitValue: number): void {
    this.validateParams(itemIndex, bitIndex, newBitValue);
    const arrayItem = this.array[itemIndex];

    if (newBitValue === 0) {
      this.array[itemIndex] = arrayItem & ~(1 << bitIndex);
    } else {
      this.array[itemIndex] = arrayItem | (1 << bitIndex);
    }
  }
}
