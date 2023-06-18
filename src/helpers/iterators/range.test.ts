import Range from './range';

describe('create ranges of numbers or characters', () => {
  test('range of characters', () => {
    const symbolRange = new Range('a', 'f');
    expect(Array.from(symbolRange)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  })

  test('range of numbers', () => {
    const numberRange = new Range(-5, 3);
    expect(Array.from(numberRange)).toEqual([-5, -4, -3, -2, -1, 0, 1, 2, 3]);
  })

  test('range of characters reversed', () => {
    const symbolRange = new Range('o', 't');
    expect(Array.from(symbolRange.reverse())).toEqual(['t', 's', 'r', 'q', 'p', 'o']);
  })
})
