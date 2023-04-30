import encode from "./encode";

describe('data encoding', () => {
  test('should correctly encode data according to schema', () => {
    const schema = [
      [3, 'number'],
      [2, 'number'],
      [1, 'boolean'],
      [1, 'boolean'],
      [16, 'ascii']
    ];
    const data = encode([2, 3, true, false, 'ab'], schema);

    const bitsCount = schema.reduce((bits, item) => {
      return bits += item[0] as number;
    }, 0);

    expect(data).toBeInstanceOf(ArrayBuffer);
    expect(data.byteLength).toBe(bitsCount);
  });

  test('should throw exception when data length does not correspond with schema', () => {
    const schema = [
      [3, 'number'],
      [2, 'number'],
      [1, 'boolean'],
    ];

    expect(() => encode([2, 3, true, false, 'ab'], schema))
      .toThrow('Data does not match the schema');
  });

  test('should throw exception when type of data item differ from the one specified in schema', () => {
    const schema = [
      [3, 'number'],
      [2, 'number'],
      [1, 'boolean'],
    ];

    expect(() => encode([58, 2, false], schema))
      .toThrow('The number of bits required for the 0 data item exceeds the one specified in schema');
  });
});
