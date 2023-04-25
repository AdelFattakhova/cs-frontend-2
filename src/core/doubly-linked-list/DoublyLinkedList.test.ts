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

    const extractedValues: any[] = [];

    for (const value of list) {
      extractedValues.push(value);
    }

    expect(extractedValues).toStrictEqual([1, 2, 3]);
  });

  test('should add new node to the beginning', () => {
    const list = new DoublyLinkedList();
    list.unshift(1);
    list.unshift(2);
    list.unshift(3);

    expect(list.first?.value).toBe(3);
    expect(list.first?.next?.value).toBe(2);
    expect(list.last?.value).toBe(1);
  });

  test('should remove node from the start', () => {
    const list = new DoublyLinkedList();
    list.push(1);
    list.push(2);
    list.push(3);

    expect(list.pop()).toBe(1);
    expect(list.first?.value).toBe(2);
  });

  test('should remove node from the end', () => {
    const list = new DoublyLinkedList();
    list.push(1);
    list.push(2);
    list.push(3);

    expect(list.shift()).toBe(3);
    expect(list.last?.value).toBe(2);
  });

  test('should throw an exception when deleting from empty list', () => {
    const list = new DoublyLinkedList();

    expect(() => list.shift()).toThrow('List is empty, nothing to delete');
    expect(() => list.pop()).toThrow('List is empty, nothing to delete');
  });
});
