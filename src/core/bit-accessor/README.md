# Function for basic work with bits

## createBitAccessor(array: Uint8Array)
Returns an object for a provided Uint8Array with the following methods:

### `get(itemIndex: number, bitIndex: number)`
Returns a bit value (of type number) with a specific index for an item with a given index. Example:
```js
const bitGetter = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

bitGetter.get(0, 0) // 0
bitGetter.get(0, 3) // 1
```

### `set(itemIndex: number, bitIndex: number, newBitValue: number)`
Sets a new bit value for a bit with a specific index in the item with a given index. Example:
```js
const bitGetter = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

bitGetter.set(0, 1, 0);
bitGetter.get(0, 1) // 0
```
