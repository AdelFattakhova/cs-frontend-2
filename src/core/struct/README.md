# Struct data structure
Javascript implementation of struct data structure based on ArrayBuffer.

## `set(field: string, value: string|number)`
Sets given value for the specified struct field. Example:
```js
const jackBlack = new Struct([
  ['name', 'utf16', 10], // Number is max allowed number of characters
  ['lastName', 'utf16', 10],
  ['age', 'u16'],
  ['occupation', 'utf16', 20],
]);

jackBlack.set('name', 'Jack');
jackBlack.set('lastName', 'Black');
jackBlack.set('age', 56);
jackBlack.set('occupation', 'software engineer');
```

## `get(field: string)`
Gets a value from a specified struct field. Example:
```js
console.log(jackBlack.get('name')); // 'Jack'
console.log(jackBlack.get('occupation')); // 'software engineer'
```
