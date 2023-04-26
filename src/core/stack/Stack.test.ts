import Stack from './Stack';

describe('Stack data structure', () => {
  test('should create empty stack', () => {
    const stack = new Stack(Int16Array, 5);

    expect(stack.maxSize).toBe(5);
    expect(stack.array.length).toBe(5);
    expect(stack.array.buffer.byteLength).toBe(10);
    expect(stack.head).toBeNull();
  });

  test('should check for empty stack', () => {
    const stack = new Stack(Uint8Array, 5);

    expect(stack.isEmpty()).toBeTruthy;
  });

  test('should check for full stack', () => {
    const stack = new Stack(Int32Array, 3);

    stack.push(10);
    stack.push(11);
    stack.push(12);

    expect(stack.isFull()).toBeTruthy;
  });

  test('should correctly add new items to stack', () => {
    const stack = new Stack(Int8Array, 3);

    stack.push(10);
    stack.push(-11);
    stack.push(12);

    expect(stack.head).toBe(12);
  });

  test('should not add new items to a full stack', () => {
    const stack = new Stack(Int16Array, 3);

    stack.push(10);
    stack.push(11);
    stack.push(12);

    expect(() => stack.push(13)).toThrow('Stack is full');
  });

  test('should correctly remove items from stack of numbers', () => {
    const stack = new Stack(Int16Array, 3);

    stack.push(10);
    stack.push(11);
    expect(stack.head).toBe(11);
    expect(stack.pop()).toBe(11);
    expect(stack.head).toBe(10);
  });

  test('should correctly remove items from stack of strings', () => {
    const stack = new Stack(Int16Array, 3);

    stack.push('a');
    stack.push('g');
    expect(stack.head).toMatch('g');
    expect(stack.pop()).toMatch('g');
    expect(stack.head).toMatch('a');
  });

  test('should throw exception on removing items from an empty stack', () => {
    const stack = new Stack(Int16Array, 3);

    expect(() => stack.pop()).toThrow('Stack is empty');
  });
});
