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

[Solution for 2, 3](./src/modules/data-encoding)

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

## **Lesson 5**
Hometask:
1. Compress deep object. Create function that would compress deep object into flat one. The task must be solved in 2 ways at minimum: using recursion and stack. You can use queue as well. [Solution](./src/modules/flatten-object/)

   ```js
   const obj = {
     a: {
       b: [1, 2],
       '': {c: 2}
     }
   };
   
   /* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */
   console.log(collapse(obj));
   ```

2. Bracket groups validation. Create function that would accept string and return true in case each bracket character (`{`, `[` and `(`) has it's closing pair in the given string and the order of these pairs is correct. [Solution](./src/modules/validate-brackets/)

   ```js
   console.log(isValid('(hello{world} and [me])'));  // true
   console.log(isValid('(hello{world)} and [me])')); // false
   console.log(isValid(')'));                        // false
   ```

## **Lesson 6**
1. Implement vector structure based on typed array. Vector must support deque's interface like native JavaScript arrays. [Solution](./src/core/vector/)

   ```js
   const uint8Vector = new Vector(Uint8Array, {capacity: 100});

   uint8Vector.push(100);    // 1
   uint8Vector.push(20, 10); // 3

   uint8Vector.pop();        // 10
   uint8Vector.shift();      // 100

   uint8Vector.unshift(1);          // 2
   console.log(uint8Vector.length); // 2
   ```

2. Implement class to describe 3-dimensional matrix. [Solution](./src/core/matrix-3d/)

   ```js
   const matrix = new Matrix3D({x: 10, y: 10, z: 10});

   matrix.set({x: 1, y: 3, z: 2}, 10);
   matrix.get({x: 1, y: 3, z: 2});
   ```

3. Implement class to create hash maps. Both primitive types and objects can be used as keys. Any hash function algorithm can be used. Collisions may be resolved using either chains method, or open addressing. Hash map must be expandable. [Solution](./src/core/hash-map/)

   ```js
   // Setting capacity of the internal buffer
   const map = new HashMap(120);

   map.set('foo', 1);
   map.set(42, 10);
   map.set(document, 100);
   
   console.log(map.get(42));          // 10
   console.log(map.has(document));    // true
   console.log(map.delete(document)); // 10
   console.log(map.has(document));    // false
   ```

## **Lesson 7**
1. Create and visualize graph via SVG

Implement creating graph using adjacement matrix, as well as adjacement struct.
Create several examples for oriented and non-oriented graphs. Visualize graphs via SVG markdown as image.
(*visualization is not done yet*)

2. Create class for convenient work with graphs

API should provide functionality to check relations between vertices. For example, if A is a parent for B and so on. API should allow describing oriented, non-oriented and adjacent graphs, as well as adding weight for edges.

- *extra task:

  Implement iterators which bypass the graph depth and breadth first, as well as a topological sort method.

3. Implement transitive closure for created graph

Implement a function or constructor that would create transitive closure based on the created graph

[Solution for adjacement matrix](./src/core/graph/GraphMatrix.ts)

[Solution for adjacement struct](./src/core/graph/GraphStruct.ts)

## **Lesson 15, 16**

1. Create an iterator for random numbers generation according to given parameters [Solution](./src/helpers/iterators/random.ts)

```js
const randomInt = random(0, 100);

console.log(randomInt.next());
console.log(randomInt.next());
console.log(randomInt.next());
console.log(randomInt.next());
```

2. Create `take` function which accepts any Iterable object and returns an iterator over the given number of its elements [Solution](./src/helpers/iterators/take.ts)

```js
const randomInt = random(0, 100);

console.log([...take(randomInt, 15)]);
```

3. Create `filter` function which accepts any Iterable object and a predicate function. It should return an iterator over those elements, which satisfies the predicate [Solution](./src/helpers/iterators/filter.ts)

```js
const randomInt = random(0, 100);

console.log([...take(filter(randomInt, (el) => el > 30), 15)]);
```

4. Create `enumerate` function which accepts any Iterable object and returns an iterator over the pairs (iteration number, element) [Solution](./src/helpers/iterators/enumerate.ts)

```js
const randomInt = random(0, 100);

console.log([...take(enumerate(randomInt), 3)]); // [[0, ...], [1, ...], [2, ...]]
```

5. Create `Range` class which allows to create ranges of numbers or characters, as well as iterate over range's elements in both normal and reverse order [Solution](./src/helpers/iterators/range.ts)
   
```js
const symbolRange = new Range('a', 'f');

console.log(Array.from(symbolRange)); // ['a', 'b', 'c', 'd', 'e', 'f']

const numberRange = new Range(-5, 1);

console.log(Array.from(numberRange.reverse())); // [1, 0, -1, -2, -3, -4, -5]
```

6. Create `seq` function which accepts a set of Iterable objects and returns an iterator over their elements [Solution](./src/helpers/iterators/seq.ts)

```js
console.log(...seq([1, 2], new Set([3, 4]), 'bla')); // 1, 2, 3, 4, 'b', 'l', 'a'
```

7. Create `zip` function which accepts a set of Iterable objects and returns an iterator over the tuples of their elements [Solution](./src/helpers/iterators/zip.ts)

```js
console.log(...zip([1, 2], new Set([3, 4]), 'bl')); // [[1, 3, b], [2, 4, 'l']]
```

8. Create function which accepts any Iterable object and Iterable containing functions and returns an iterator where functions from the second Iterable are sequentially applied to each element of the first one [Solution](./src/helpers/iterators/mapSeq.ts)

```js
console.log(...mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1])); // [1, 3, 5]
```
