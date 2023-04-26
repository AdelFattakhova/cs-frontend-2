# Queue (can be used as Deque) data structure
Implementation of a Queue (Deque) based on Doubly Linked List

## `head = null`
Returns value of the first queue node.

## `tail = null`
Returns value of the last queue node.

## `push(value: number | string | [])`
Adds new values to the end of the queue. Example:
```js
const queue = new Queue();

queue.push(10);
queue.push(11);
queue.push(12);

console.log(queue.head);  // 10
```

## `unshift(value: number | string | [])`
Adds new value to the beginning of the deque. Example:
```js
const deque = new Queue();

deque.push(10);
deque.unshift(11);
deque.push(12);

console.log(deque.head);  // 11
```

## `pop()`
Removes the first value from the queue and returns it. Example:
```js
const queue = new Queue();

queue.push(1);
queue.push(2);
queue.push(3);

console.log(queue.pop());  // 1
console.log(queue.head);  // 2
```

## `shift()`
Removes the last value from the deque and returns it. Example:
```js
const deque = new Queue();

deque.push(1);
deque.push(2);
deque.push(3);

console.log(deque.shift());  // 3
console.log(deque.head);  // 1
```
