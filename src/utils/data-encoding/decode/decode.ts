import { createBitAccessor } from "../../bit-accessor/bit-accessor";

export default function decode(buffer: ArrayBuffer, schema: (string|number)[][]) {
  validateData(buffer, schema);

  const typedArray = new Uint8Array(buffer);
  const bitAccessor = createBitAccessor(typedArray);
  let encodedData = '';
  const decodedData = [];

  for (let i = 0; i < typedArray.length; i++) {
    const byteIndex = Math.floor(i / 8);
    const bitIndex = i % 8;

    encodedData += bitAccessor.get(byteIndex, bitIndex);
  }

  let byteOffset = 0;
  let previousItem = encodedData.length;

  for (let i = 0; i < schema.length; i++) {
    const bitsForPrevItem = Array.isArray(schema[i - 1]) ? (schema[i - 1][0] as number) : 0;
    byteOffset += bitsForPrevItem;
    previousItem -= bitsForPrevItem;

    const item = encodedData.substring(encodedData.length - (schema[i][0] as number) - byteOffset, previousItem);

    if (schema[i][1] === 'ascii') {
      decodedData.push(decodeAsciiChars(item, schema[i][0] as number));
    } else if (schema[i][1] === 'number') {
      decodedData.push(parseInt(item, 2));
    } else if (schema[i][1] === 'boolean') {
      decodedData.push(Boolean(parseInt(item)));
    }
  }

  return decodedData;
}

function decodeAsciiChars(binaryString: string, bitsForString: number) {
  const charsCount = Math.ceil(bitsForString / 8);
  let decodedString = '';

  for (let i = 1; i <= charsCount; i++) {
    const binaryChar = binaryString.substring(
      binaryString.length - 8 * i,
      binaryString.length - 8 * (i - 1)
    );

    decodedString += String.fromCharCode(parseInt(binaryChar, 2));
  }

  return decodedString;
}

function validateData(data: ArrayBuffer, schema: (string|number)[][]) {
  const bitsCount = schema.reduce((bits, item) => {
    return bits += item[0] as number;
  }, 0);

  if (bitsCount !== data.byteLength) {
    throw new Error('The size of the given data does not match the one specified in schema');
  }
}
