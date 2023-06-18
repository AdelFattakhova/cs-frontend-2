import zip from './zip';

describe("iterates over tuples of iterables' elements", () => {
  test('equal number of elements', () => {
    expect([...zip([1, 2], new Set([3, 4]), 'bl')])
      .toEqual([[1, 3, 'b'], [2, 4, 'l']]);
  })

  test('first element is longer', () => {
    expect([...zip([1, 2, 3], new Set([3, 4]), 'bl')])
      .toEqual([[1, 3, 'b'], [2, 4, 'l']]);
  })

  test('last element is longer', () => {
    expect([...zip([1, 2], new Set([3, 4]), 'bla')])
      .toEqual([[1, 3, 'b'], [2, 4, 'l']]);
  })

  test('one element is empty', () => {
    expect([...zip([1, 2], new Set([3, 4]), '')])
      .toEqual([]);
  })
})
