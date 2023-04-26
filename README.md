# Computer Science in Frontend: Chapter 2

## **Lesson 1**
Hometask:
1. Create a function that takes a Uint8Array and allows you to access a bit of a specific element
2. Extend the function from the previous task with the ability to change the value of a specific bit

[Solution](./src/core/bit-accessor)

## **Lesson 2**
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

## **Lesson 3**
Hometask:
1. Implement doubly linked list:
    ```js
    const list = LinkedList();

    list.add(1);
    list.add(2);
    list.add(3);

    console.log(list.first.value);           // 1
    console.log(list.last.value);            // 3
    console.log(list.first.next.value);      // 2
    console.log(list.first.next.prev.value); // 1
    ```

2. Make this list iterable:

    ```js
    const list = LinkedList();

    list.add(1);
    list.add(2);
    list.add(3);

    for (const value of list) {
      console.log(value);
    }
    ```

[Solution for 1, 2](./src/core/doubly-linked-list/)

3. Implement struct based on ArrayBuffer:

   ```js
   const jackBlack = Structure([
     ['name', 'utf16', 10], // Number is a maximum allowed amount of characters
     ['lastName', 'utf16', 10],
     ['age', 'u16'] // uint16
   ]);
   
   jackBlack.set('name', 'Jack');
   jackBlack.set('lastName', 'Black');
   jackBlack.set('age', 53);
   
   console.log(jackBlack.get('name')); // 'Jack'
   ```

[Solution for 3](./src/core/struct/)

## **Lesson 4**
Hometask:
1. Implement queue based on doubly linked list:

    ```js
    const queue = Queue();
    
    queue.push(10);
    queue.push(11);
    queue.push(12);
    
    console.log(queue.head);  // 10
    
    console.log(queue.pop()); // 10
    
    console.log(queue.head);  // 11
    
    console.log(queue.pop()); // 11
    console.log(queue.pop()); // 12
    console.log(queue.pop()); // Exception
    ```
2. Implement double-ended queue (deque)

   ```js
   const dequeue = Queue();
   
   dequeue.push(10);
   dequeue.unshift(11);
   dequeue.push(12);

   console.log(dequeue.pop());   // 11
   console.log(dequeue.shift()); // 12
   console.log(dequeue.pop());   // 10
   console.log(dequeue.pop());   // Exception
   ```

[Solution for 1, 2](./src/core/queue/)

3. Implement stack based on typed array of a given length

   ```js
   const stack = Stack(Int32Array, 10);
   
   stack.push(10);
   stack.push(11);
   stack.push(12);
   
   console.log(stack.head);  // 12
   
   console.log(stack.pop()); // 12
   
   console.log(stack.head);  // 11
   
   console.log(stack.pop()); // 11
   console.log(stack.pop()); // 10
   console.log(stack.pop()); // Exception
   ```

[Solution](./src/core/stack/)
