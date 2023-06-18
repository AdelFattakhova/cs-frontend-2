import filter from './filter';

describe('filter for iterables', () => {
  test('for string: should filter out correctly', () => {
    expect([...filter('avengers: era of ultron', (el: string) => {
      return !['a', 'e', 'y', 'u', 'i', 'o'].includes(el);
    })].join('')).toMatch('vngrs: r f ltrn');
  })

  test('for array: should filter out correctly', () => {
    expect([...filter([1, 2, 3, 4, 5, 6, 7], (el: number) => {
      return el > 3;
    })]).toEqual([4, 5, 6, 7]);
  })
})
