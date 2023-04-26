import decode from "./decode";
import encode from "../encode/encode";

describe('data decoding', () => {
  test('should correctly decode data according to schema', () => {
    const schema = [
      [3, 'number'],
      [2, 'number'],
      [1, 'boolean'],
      [1, 'boolean'],
      [16, 'ascii']
    ];
    const data = encode([2, 3, true, false, 'ab'], schema);
    const decodedData = decode(data, schema);

    expect(decodedData).toStrictEqual([2, 3, true, false, 'ab']);
  });

  test('should correctly decode data with leading zeros', () => {
    const schema = [
      [24, 'ascii'],
      [1, 'boolean']
    ];

    const data = encode(['tru', false], schema);
    const decodedData = decode(data, schema);

    expect(decodedData).toStrictEqual(['tru', false]);
  });

  test('should throw error when data does not match the schema', () => {
    const wrongSchema = [
      [3, 'number'],
      [2, 'number'],
      [1, 'boolean'],
    ];

    const wrongData = encode([1, 2, false], wrongSchema);

    const rightSchema = [
      [24, 'ascii'],
      [1, 'boolean']
    ];

    expect(() => decode(wrongData, rightSchema)).toThrow('The size of the given data does not match the one specified in schema');
  });
});
