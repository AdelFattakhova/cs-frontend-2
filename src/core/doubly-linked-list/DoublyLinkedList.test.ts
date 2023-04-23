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
});
