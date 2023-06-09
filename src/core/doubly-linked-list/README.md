# DoublyLinkedList data structure

## `push(value: number | string | [])`
Adds new node to the end of the list with a given value. Example:
```js
const list = new DoublyLinkedList();
   
list.add(1);
list.add(2);
list.add(3);

console.log(list.first.value);           // 1
console.log(list.last.value);            // 3
console.log(list.first.next.value);      // 2
console.log(list.first.next.prev.value); // 1
```

## `unshift(value: number | string | [])`
Adds new node to the beginning of the list with a given value

## `pop()`
Deletes the first node from the list and returns its value

## `shift()`
Deletes the last node from the list and returns its value

## `list is iterable`
Doubly linked list can be iterated over. Example:
```js
for (const value of list) {
  console.log(value);
}
```
