import createBitAccessor from "./BitAccessor";

describe('bit access', () => {
  test('bit accessor should return a certain bit of a certain array item', () => {
    const bitGetter = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

    expect(bitGetter.get(0, 1)).toEqual(1);
    expect(bitGetter.get(0, 3)).toEqual(1);
    expect(bitGetter.get(1, 0)).toEqual(1);
    expect(bitGetter.get(1, 1)).toEqual(0);
  });

  test('bit accessor should change bits of any value to 0', () => {
    const bitGetter = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

    bitGetter.set(0, 1, 0);
    expect(bitGetter.get(0, 1)).toEqual(0);
    bitGetter.set(0, 1, 0);
    expect(bitGetter.get(0, 1)).toEqual(0);
  });

  test('bit accessor should change bits of any value to 1', () => {
    const bitGetter = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

    bitGetter.set(1, 1, 1);
    expect(bitGetter.get(1, 1)).toEqual(1);
    bitGetter.set(1, 1, 1);
    expect(bitGetter.get(1, 1)).toEqual(1);
  });

  test('bit accessor must throw an error when receiving negative item index', () => {
    const bitGetter = createBitAccessor(new Uint8Array([0b1110, 0b1101]));
    expect(() => bitGetter.get(-4, 1)).toThrow('Item index must be greater than 0 and lower than array length');
  });

  test('bit accessor must throw an error when receiving item index greater than array length', () => {
    const bitGetter = createBitAccessor(new Uint8Array([0b1110, 0b1101]));
    expect(() => bitGetter.get(4, 1)).toThrow('Item index must be greater than 0 and lower than array length');
  });

  test('bit accessor must throw an error when receiving negative bit index', () => {
    const bitGetter = createBitAccessor(new Uint8Array([0b1110, 0b1101]));
    expect(() => bitGetter.get(1, -1)).toThrow('The bit index must be greater than 0 and lower than 8');
  });

  test('bit accessor must throw an error when receiving bit index greater than 7', () => {
    const bitGetter = createBitAccessor(new Uint8Array([0b1110, 0b1101]));
    expect(() => bitGetter.get(1, 9)).toThrow('The bit index must be greater than 0 and lower than 8');
  });

  test('bit accessor must throw an error when receiving negative bit index', () => {
    const bitGetter = createBitAccessor(new Uint8Array([0b1110, 0b1101]));
    expect(() => bitGetter.set(1, 1, -3)).toThrow('The bit value must be either 0 or 1');
  });

  test('bit accessor must throw an error when receiving bit index greater than 1', () => {
    const bitGetter = createBitAccessor(new Uint8Array([0b1110, 0b1101]));
    expect(() => bitGetter.set(1, 1, 3)).toThrow('The bit value must be either 0 or 1');
  });

  test('should throw error when trying to access empty array', () => {
    expect(() => createBitAccessor(new Uint8Array())).toThrow('Array is empty');
  });
});
