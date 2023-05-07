import HashMap from './HashMap';
import Hasher from './Hasher';

describe('Hash Map class', () => {
  test("should add new values and increment hash map's length", () => {
    const map = new HashMap(Hasher);

    map.set('abc', 1);
    map.set(42, 2);
    map.set(['f1', 21, 'jdskjsjf', 2, 4829], 10);
    map.set(process, 'abc');

    expect(map.length).toBe(4);
  });

  test("should throw type error when setting key of type other than number, string or object", () => {
    const map = new HashMap(Hasher);
    // @ts-ignore
    expect(() => map.set(true, 1)).toThrow('Invalid key type');
  });

  test("should throw type error when getting key of type other than number, string or object", () => {
    const map = new HashMap(Hasher);
    // @ts-ignore
    expect(() => map.get(true)).toThrow('Invalid key type');
  });

  test("should throw type error when checking key of type other than number, string or object", () => {
    const map = new HashMap(Hasher);
    // @ts-ignore
    expect(() => map.has(true)).toThrow('Invalid key type');
  });

  test('should find values in map by key', () => {
    const map = new HashMap(Hasher);

    map.set('abc', 1);
    map.set(42, 2);
    map.set(['f1', 21, 'jdskjsjf', 2, 4829], 10);
    map.set(process, 'abc');

    expect(map.has('abc')).toBe(true);
    expect(map.has(42)).toBe(true);
    expect(map.has(['f1', 21, 'jdskjsjf', 2, 4829])).toBe(true);
    expect(map.has(process)).toBe(true);
  });

  test('should get values in map by key', () => {
    const map = new HashMap(Hasher);

    map.set('abc', 1);
    map.set(42, 2);
    map.set(['f1', 21, 'jdskjsjf', 2, 4829], 10);
    map.set(process, 'abc');

    expect(map.get('abc')).toBe(1);
    expect(map.get(42)).toBe(2);
    expect(map.get(['f1', 21, 'jdskjsjf', 2, 4829])).toBe(10);
    expect(map.get(process)).toBe('abc');
  });

  test('should delete values in map by key and return deleted values', () => {
    const map = new HashMap(Hasher);

    map.set('abc', 1);
    map.set(42, 2);
    map.set(39, '5');
    map.set(['f1', 21, 'jdskjsjf', 2, 4829], 10);
    map.set(process, 'abc');

    expect(map.delete('abc')).toBe(1);
    expect(map.delete(42)).toBe(2);
    expect(map.delete(['f1', 21, 'jdskjsjf', 2, 4829])).toBe(10);
    expect(map.delete(process)).toMatch('abc');

    expect(map.has('abc')).toBe(false);
    expect(map.has(42)).toBe(false);
    expect(map.has(['f1', 21, 'jdskjsjf', 2, 4829])).toBe(false);
    expect(map.has(process)).toBe(false);

    expect(map.length).toBe(1);
  });

  test('should resolve collisions with double hashing', () => {
    const map = new HashMap(Hasher);

    map.set('fo', 1);
    map.set('f1', 'collision with fo');
    map.set(42, 10);
    map.set(11, 'collision with 42');
    map.set(73, 'collision 2 with 42');

    expect(map.get('fo')).toBe(1);
    expect(map.get('f1')).toMatch('collision with fo');
    expect(map.get(42)).toBe(10);
    expect(map.get(11)).toMatch('collision with 42');
    expect(map.get(73)).toMatch('collision 2 with 42');
  });

  test('should not add values with existing key', () => {
    const map = new HashMap(Hasher);

    map.set('fo', 1);
    map.set('fo', 2);

    expect(map.get('fo')).toBe(1);
  });

  test('should expand buffer when load factor >= 0.75', () => {
    const map = new HashMap(Hasher, 5);

    map.set('fo', 1);
    expect(map.getCapacity()).toBe(5);
    map.set('f1', 'collision with fo');
    expect(map.getCapacity()).toBe(5);
    map.set(42, 10);
    expect(map.getCapacity()).toBe(5);
    map.set(11, 'collision with 42');
    expect(map.getCapacity()).toBe(11);
    map.set(73, 'collision 2 with 42');
    expect(map.getCapacity()).toBe(11);
    map.set(['f1', 21, 'jdskjsjf', 2, 4829], 10);
    expect(map.getCapacity()).toBe(11);
    map.set(process, 'abc');
    expect(map.getCapacity()).toBe(11);
    map.set('a', 1);
    expect(map.getCapacity()).toBe(11);
    map.set('b', 2);
    expect(map.getCapacity()).toBe(23);
  });
});
