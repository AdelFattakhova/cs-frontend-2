import DoublyLinkedList from './DoublyLinkedList';

describe('doubly linked list', () => {
  test('should get the first element', () => {
    const list = new DoublyLinkedList();
    list.push(5);

    expect(list.first?.value).toBe(5);
  });

  test('should get the last element', () => {
    const list = new DoublyLinkedList();
    list.push(1);
    list.push(2);
    list.push(3);

    expect(list.last?.value).toBe(3);
  });

  test('should add new node to the end', () => {
    const list = new DoublyLinkedList();
    list.push(1);
    list.push(2);
    list.push(3);

    expect(list.first?.value).toBe(1);
    expect(list.first?.next?.value).toBe(2);
    expect(list.first?.next?.prev?.value).toBe(1);
    expect(list.last?.value).toBe(3);
    expect(list.last?.prev?.value).toBe(2);
  });

  test('iterable', () => {
    const list = new DoublyLinkedList();
   
    list.push(1);
    list.push(2);
    list.push(3);
    
    for (const value of list) {
      console.log(value);
    }
  });

  // test('should add new node to the beginning', () => {
  //   const list = new DoublyLinkedList();
  //   list.addStart(1);
  //   list.addStart(2);
  //   list.addStart(3);
    
  //   expect(list.first.value).toBe(3);
  //   expect(list.first.next.value).toBe(2);
  //   expect(list.last.value).toBe(1);
  // });

  // test('should remove node from the start', () => {
  //   const list = new DoublyLinkedList();
  //   list.push(1);
  //   list.push(2);
  //   list.push(3);

  //   expect(list.removeStart().value).toBe(1);
  //   expect(list.first.value).toBe(2);
  // });

  // test('should remove node from the end', () => {
  //   const list = new DoublyLinkedList();
  //   list.push(1);
  //   list.push(2);
  //   list.push(3);

  //   expect(list.removeEnd().value).toBe(3);
  //   expect(list.last.value).toBe(2);
  // });

  // test('should throw an exception when removing from empty list', () => {
  //   const list = new DoublyLinkedList();

  //   expect(() => list.removeStart()).toThrow('list is empty, nothing to remove!');
  //   expect(() => list.removeEnd()).toThrow('list is empty, nothing to remove!');
  // });
});
