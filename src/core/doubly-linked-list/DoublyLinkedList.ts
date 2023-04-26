type Node = {
  value: number | string | [],
  next: Node,
  prev: Node,
} | null;

export default class DoublyLinkedList {
  first: Node = null;
  last: Node = null;

  push(value: number | string | []) {
    const newNode: Node = {
      value,
      next: null,
      prev: this.last || null,
    };

    if (this.last) {
      this.last.next = newNode;
      this.last = newNode;

    } else {
      this.first = newNode;
      this.last = newNode;
    }
  }

  unshift(value: number | string | []) {
    const newNode: Node = {
      value,
      next: this.first || null,
      prev: null,
    };

    if (this.first) {
      this.first.prev = newNode;
      newNode.next = this.first;
      this.first = newNode;

    } else {
      this.first = newNode;
      this.last = newNode;
    }
  }

  pop() {
    if (!this.first) {
      throw new Error('List is empty, nothing to delete');
    }

    const removedValue = this.first.value;

    if (this.first.next) {
      this.first.next.prev = null;
    } else {
      this.last = null;
    }

    this.first = this.first.next;

    return removedValue;
  }

  shift() {
    if (!this.last) {
      throw new Error('List is empty, nothing to delete');
    }

    const removedValue = this.last.value;

    if (this.last.prev) {
      this.last.prev.next = null;
    } else {
      this.first = null;
    }

    this.last = this.last.prev;

    return removedValue;
  }

  [Symbol.iterator] = () => {
    return {
      current: this.first,

      next() {
        if (this.current) {
          const currentValue = this.current.value;
          this.current = this.current.next;
          return { done: false, value: currentValue };
        } else {
          return { done: true };
        }
      }
    };
  };
}
