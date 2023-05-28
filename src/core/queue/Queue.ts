import linkedList from '../doubly-linked-list/DoublyLinkedList';

export default class Queue {
  list;
  head: string | number | [] | object | null = null;
  tail: string | number | [] | object | null = null;

  constructor() {
    this.list = new linkedList;
  }

  push(value: number | string | [] | object) {
    this.list.push(value);

    if (this.list.last) {
      if (this.head === null) this.head = this.list.last.value;

      this.tail = this.list.last.value;
    }
  }

  unshift(value: number | string | [] | object) {
    this.list.unshift(value);

    if (this.list.first) {
      this.head = this.list.first.value;
    }
  }

  pop() {
    if (!this.head) {
      throw new Error('Queue is empty, nothing to delete');
    }

    const removedValue = this.list.pop();

    if (!this.list.first) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.list.first.value;
    }

    return removedValue;
  }

  shift() {
    if (!this.head) {
      throw new Error('Queue is empty, nothing to delete');
    }

    const removedValue = this.list.shift();

    if (!this.list.last) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.list.last.value;
    }

    return removedValue;
  }
}
