export default function createBitAccessor(array: Uint8Array | Uint16Array | Uint32Array) {
  const maxBytes = array.BYTES_PER_ELEMENT * 8;

  if (array.length === 0) {
    throw new Error('Array is empty');
  }

  function validateParams(itemIndex: number, bitIndex: number, newBitValue?: number): void {
    if (itemIndex < 0 || itemIndex > array.length - 1) {
      throw new Error('Item index must be greater than 0 and lower than array length');
    }

    if (bitIndex < 0 || bitIndex > (maxBytes - 1)) {
      throw new Error(`The bit index must be greater than 0 and lower than ${maxBytes}`);
    }

    if (newBitValue && (newBitValue < 0 || newBitValue > 1)) {
      throw new Error('The bit value must be either 0 or 1');
    }
  }

  return {
    get(itemIndex: number, bitIndex: number): number {
      validateParams(itemIndex, bitIndex);

      const arrayItem = array[itemIndex];
      const searchedBit = arrayItem & (1 << bitIndex);

      return searchedBit === 0 ? 0 : 1;
    },

    set(itemIndex: number, bitIndex: number, newBitValue: number): void {
      validateParams(itemIndex, bitIndex, newBitValue);
      const arrayItem = array[itemIndex];

      if (newBitValue === 0) {
        array[itemIndex] = arrayItem & ~(1 << bitIndex);
      } else {
        array[itemIndex] = arrayItem | (1 << bitIndex);
      }
    }
  };
}
