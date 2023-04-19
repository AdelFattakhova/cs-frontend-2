# API for optimal data encoding

## `encode(data: any[], schema: (string|number)[][])`
Returns `ArrayBuffer`

Encodes data provided in array according to the schema. Schema is an array of arrays with pairs `[number-of-bits, type-of-data]`.
Example:

```js
const schema = [
  [3, 'number']  // 3 bits number
  [2, 'number']  // 2 bits number
  [1, 'boolean'] // 1 bit boolean
  [1, 'boolean'] // 1 bit boolean
  [16, 'ascii']  // 16 bits 2 ASCII symbols
];

const data = encode([2, 3, true, false, 'ab'], schema);
```

## `decode(buffer: ArrayBuffer, schema: (string|number)[][])`
Returns an array of decoded data

Decodes provided `ArrayBuffer` into human-readable data according to the schema.
Example:

```js
console.log(decode(data, schema)); // [2, 3, true, false, 'ab']
```
