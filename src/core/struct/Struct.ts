export default class Struct {
  mappedSchema: object;
  data: Uint8Array | Uint16Array | Uint32Array;

  constructor(schema: (string | number)[][]) {
    let maxEncoding = 0;
    let maxDataLength = 0;

    this.mappedSchema = schema.reduce((accum, [field, encoding, maxLength = 1]) => {
      const bitsPerValue: number = +(encoding as string).match(/\d+/)![0];
      maxEncoding = Math.max(maxEncoding, bitsPerValue);

      const updatedAccum = Object.assign(accum, {
        [field]: {
          encoding: bitsPerValue,
          dataType: (encoding as string).match(/utf/) ? 'string' : 'number',
          maxLength: maxLength,
          offset: maxDataLength,
        }
      });

      maxDataLength += maxLength as number;

      return updatedAccum;
    }, {});

    this.data
      = new globalThis[`Uint${maxEncoding}Array` as keyof typeof globalThis](maxDataLength);
  }

  private validateData(value: string | number, type: string, maxLength: number, encoding: number) {
    if (typeof value !== type) {
      throw new Error('Value type does not match the schema');
    }

    if (typeof value === 'string' && value.length > maxLength
      || typeof value !== 'string' && value.toString(2).length > encoding) {
      throw new Error('Amount of memory required for provided value exceeds memory allocated for this field');
    }
  }

  private createMask(bits: number) {
    return 2 ** 32 - 1 >>> (32 - bits);
  }

  private writeValue(value: number, encoding: number, offset: number, index?: number) {
    const binaryValue = value & this.createMask(encoding);

    if (index !== undefined) {
      this.data[index + offset] |= binaryValue;
    } else {
      this.data[offset] |= binaryValue;
    }
  }

  set(field: string, value: string | number) {
    if (this.mappedSchema[field as keyof typeof this.mappedSchema] === undefined) {
      throw new Error('No such field');
    }

    const { encoding, dataType, maxLength, offset }
      = this.mappedSchema[field as keyof typeof this.mappedSchema];

    this.validateData(value, dataType, maxLength, encoding);

    if (dataType === 'string') {
      (value as string).split('').forEach((char: string, index: number) => {
        this.writeValue(char.charCodeAt(0), encoding, offset, index);
      });

    } else {
      this.writeValue(value as number, encoding, offset);
    }
  }

  get(field: string) {
    if (this.mappedSchema[field as keyof typeof this.mappedSchema] === undefined) {
      throw new Error('No such field');
    }

    const { dataType, maxLength, offset }
      = this.mappedSchema[field as keyof typeof this.mappedSchema];
    let value;

    if (dataType === 'string') {
      value = '';

      for (let i = offset; i < maxLength + offset; i++) {
        value += String.fromCharCode(this.data[i]);
      }

    } else {
      value = this.data[offset];
    }

    return value;
  }
}
