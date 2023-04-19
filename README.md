# Computer Science in Frontend: Chapter 2

### **Lesson 1.**
Hometask:
1. Create a function that takes a Uint8Array and allows you to access a bit of a specific element
2. Extend the function from the previous task with the ability to change the value of a specific bit

[Solution](./src/utils/bit-accessor)

### **Lesson 2.**
Hometask:
1. Create filters for images in Canvas ([Solution](./src/modules/image-filters))
2. Create a function for data encoding according to schema. If the data doesn't match the schema, throw an exception with a comment. The result should be ArrayBuffer.
```js
const schema = [
  [3, 'number']  // 3 bits number
  [2, 'number']  // 2 bits number
  [1, 'boolean'] // 1 bit boolean
  [1, 'boolean'] // 1 bit boolean
  [16, 'ascii']  // 16 bits 2 ASCII symbols
];
```
3. Create a function for parsing the ArrayBuffer from the previous task according to the same schema. If the data doesn't match the schema, throw an exception with a comment.

[Solution for 2, 3](./src/utils/data-encoding)
