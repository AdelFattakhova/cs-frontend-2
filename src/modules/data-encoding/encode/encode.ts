import createBitAccessor from "../../../core/bit-accessor/BitAccessor";

// TODO: refactor to encode with 32 bits per item, not for the whole shema

export default function encode(data: any[], schema: (string | number)[][]) {
  const typedArray = new Uint8Array(setBuffer(schema));
  const bitAccessor = createBitAccessor(typedArray);
  let encodedData = 0;
  let byteOffset = 0;

  data.forEach((item: number | string | boolean, index) => {
    if (!schema[index]) throw new Error('Data does not match the schema');

    const [bits, type] = schema[index];

    if (typeof item === 'string' && type !== 'ascii'
      || typeof item !== 'string' && typeof item !== type) {
      throw new Error(`The type of the ${index} data item does not match the schema`);
    }

    byteOffset += schema[index - 1] ? (schema[index - 1][0] as number) : 0;

    if (typeof item === 'number') {
      const encodedItem = encodeSingleItem(item, index, bits as number);
      encodedData |= encodedItem << byteOffset;
    } else if (typeof item === 'boolean') {
      const encodedItem = encodeSingleItem(item ? 1 : 0, index, bits as number);
      encodedData |= encodedItem << byteOffset;
    } else if (typeof item === 'string') {
      const chars = item.split('');
      chars.forEach((char, charIndex) => {
        const encodedItem = encodeSingleItem(char.charCodeAt(0), index, (bits as number) / chars.length);
        encodedData |= encodedItem << (byteOffset + 8 * charIndex);
      });
    }
  });

  const stringFromEncodedData = encodedData.toString(2).padStart(typedArray.length, '0');

  for (let i = 0; i < stringFromEncodedData.length; i++) {
    const byteIndex = Math.floor(i / 8);
    const bitIndex = i % 8;

    bitAccessor.set(byteIndex, bitIndex, parseInt(stringFromEncodedData[i]));
  }

  return typedArray.buffer;
}

function setBuffer(schema: (string | number)[][]) {
  const bitsCount = schema.reduce((bits, item) => {
    return bits += item[0] as number;
  }, 0);

  if (bitsCount > 32) {
    throw new Error('The number of bits required to store data for the schema should not exceed 32');
  }

  return new ArrayBuffer(bitsCount);
}

function encodeSingleItem(item: any, itemIndex: number, bitsForItem: number) {
  if (item.toString(2).length > bitsForItem) {
    throw new Error(`The number of bits required for the ${itemIndex} data item exceeds the one specified in schema`);
  }

  const binaryItem = item & (2 ** 32 - 1 >>> (32 - bitsForItem));
  return binaryItem;
}
