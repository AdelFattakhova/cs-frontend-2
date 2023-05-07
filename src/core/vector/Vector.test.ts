import Vector from './Vector';

describe('Vector', () => {
  test('should add values to the end', () => {
    const uint8Vector = new Vector(Uint8Array, { capacity: 5 });

    expect(uint8Vector.push(100)).toBe(1);
    expect(uint8Vector.push(20, 10)).toBe(3);
  });

  test('should add values to the start', () => {
    const uint8Vector = new Vector(Uint8Array, { capacity: 5 });

    expect(uint8Vector.unshift(100)).toBe(1);
    expect(uint8Vector.unshift(20, 10)).toBe(3);
  });

  test('should remove values from the end', () => {
    const uint8Vector = new Vector(Uint8Array, { capacity: 5 });

    uint8Vector.push(100);
    uint8Vector.push(20, 10);
    uint8Vector.push(30, 40);

    expect(uint8Vector.pop()).toBe(40);
  });

  test('should remove values from the start', () => {
    const uint8Vector = new Vector(Uint8Array, { capacity: 5 });

    uint8Vector.unshift(100);
    uint8Vector.unshift(20, 10);
    uint8Vector.unshift(30, 40);

    expect(uint8Vector.shift()).toBe(30);
  });

  test('should increase vector capacity when necessary', () => {
    const uint8Vector = new Vector(Uint8Array, { capacity: 6 });

    uint8Vector.push(100);
    uint8Vector.push(20, 10);
    uint8Vector.push(30, 40);
    expect(uint8Vector.capacity).toBe(6);
    uint8Vector.unshift(1, 2, 3)
    expect(uint8Vector.capacity).toBe(12);
    uint8Vector.push(50);
    expect(uint8Vector.capacity).toBe(12);
  });
});
