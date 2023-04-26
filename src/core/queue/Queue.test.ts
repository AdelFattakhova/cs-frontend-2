import Queue from './Queue';

describe('queue based on a doubly linked list', () => {
  test('should return the first element of a queue', () => {
    const queue = new Queue();
    queue.push(10);
    queue.push(11);
    queue.push(12);

    expect(queue.head).toBe(10);
  });

  test('should return null when getting empty queue\'s head', () => {
    const queue = new Queue();
    expect(queue.head).toBe(null);
  });

  test('should add the new element to the end of the queue', () => {
    const queue = new Queue();
    queue.push(10);
    queue.push(11);
    queue.push(12);

    expect(queue.head).toBe(10);
  });

  test('should remove the first element from the queue', () => {
    const queue = new Queue();
    queue.push(10);
    queue.push(11);
    queue.push(12);

    expect(queue.pop()).toBe(10);
    expect(queue.head).toBe(11);
  });

  test('should add the new element to the beginning of the queue', () => {
    const deque = new Queue();
    deque.unshift(10);
    deque.unshift(11);
    deque.unshift(12);

    expect(deque.head).toBe(12);
  });

  test('should remove the last element from the queue', () => {
    const deque = new Queue();
    deque.push(10);
    deque.push(11);
    deque.push(12);

    expect(deque.shift()).toBe(12);
    expect(deque.tail).toBe(11);
  });

  test('should throw an exception when trying to remove elements from an empty queue', () => {
    const deque = new Queue();

    expect(() => deque.pop()).toThrow('Queue is empty, nothing to delete');
    expect(() => deque.shift()).toThrow('Queue is empty, nothing to delete');
  });
})
