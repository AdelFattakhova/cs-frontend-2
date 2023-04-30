import { stackFlatten, recursiveFlatten } from './flatten-object';

describe('Should flatten object correctly', () => {
  test('should flatten object using stack', () => {
    const obj = {
      a: {
        b: [1, 2],
        '': { c: 2 }
      },
      d: {
        f: { g: 4 },
        '': [1, 2, 3],
        e: 3
      }
    };

    expect(stackFlatten(obj)).toStrictEqual({
      'a.b.0': 1,
      'a.b.1': 2,
      'a..c': 2,
      'd.f.g': 4,
      'd..0': 1,
      'd..1': 2,
      'd..2': 3,
      'd.e': 3
    });
  });

  test('stack: should return empty object for empty object', () => {
    expect(stackFlatten({})).toEqual({});
  });

  test('should flatten object using recursion', () => {
    const obj = {
      a: {
        b: [1, 2],
        '': { c: 2 }
      },
      d: {
        f: { g: 4 },
        '': [1, 2, 3],
        e: 3
      }
    };

    expect(recursiveFlatten(obj)).toStrictEqual({
      'a.b.0': 1,
      'a.b.1': 2,
      'a..c': 2,
      'd.f.g': 4,
      'd..0': 1,
      'd..1': 2,
      'd..2': 3,
      'd.e': 3
    });
  });

  test('recursion: should return empty object for empty object', () => {
    expect(recursiveFlatten({})).toEqual({});
  });

  test('should flatten object of depth 7 using stack', () => {
    const obj = {
      a: {
        b: [1],
      },
      d: [
        {
          f: { g: 4 },
          '': {
            a: {
              b: 0,
              c: {
                h: [8, 9]
              }
            }
          }
        }
      ]
    };

    expect(stackFlatten(obj)).toStrictEqual({
      'a.b.0': 1,
      'd.0.f.g': 4,
      'd.0..a.b': 0,
      'd.0..a.c.h.0': 8,
      'd.0..a.c.h.1': 9,
    });
  });

  test('should flatten object of depth 7 using recursion', () => {
    const obj = {
      a: {
        b: [1],
      },
      d: [
        {
          f: { g: 4 },
          '': {
            a: {
              b: 0,
              c: {
                h: [8, 9]
              }
            }
          }
        }
      ]
    };

    expect(recursiveFlatten(obj)).toStrictEqual({
      'a.b.0': 1,
      'd.0.f.g': 4,
      'd.0..a.b': 0,
      'd.0..a.c.h.0': 8,
      'd.0..a.c.h.1': 9,
    });
  });
});
