type Node = {
  value: any,
  next: Node,
  prev: Node,
} | null;

export default class DoublyLinkedList {
  first: Node = null;
  last: Node = null;

  push(value: any) {
    if (this.last) {
      const newNode: Node = {
        value,
        next: null,
        prev: this.last,
      };
      this.last.next = newNode;
      this.last = newNode;
    } else {
      const newNode: Node = {
        value,
        next: null,
        prev: null,
      };
      this.first = newNode;
      this.last = newNode;
    }
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
  }
}
