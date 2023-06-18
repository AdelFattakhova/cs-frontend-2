import mapSeq from './mapSeq';

describe('map iterables with sequence of functions', () => {
  test('one function, string', () => {
    expect([...mapSeq('friends', [
      (el: string) => {
        const codePoint = el.codePointAt(0)!;
        return String.fromCodePoint(codePoint + 1);
      },
    ])].join('')).toMatch('gsjfoet');
  })

  test('two functions, array', () => {
    expect([...mapSeq([1, 2, 3], [
      (el: number) => el * 2,
      (el: number) => el - 1
    ])]).toEqual([1, 3, 5]);
  })

  test('three functions, set', () => {
    expect([...mapSeq(new Set([1, 2, 3]), [
      (el: number) => el * 2,
      (el: number) => el - 1,
      (el: number) => el ** 3
    ])]).toEqual([1, 27, 125]);
  })
})
