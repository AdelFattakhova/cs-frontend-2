import seq from './seq';

describe('iterate over iterables', () => {
  test('returns iterator over elements of iterables', () => {
    expect([...seq([1, 2], new Set([3, 4, 'f']), 'bla')])
      .toEqual([1, 2, 3, 4, 'f', 'b', 'l', 'a']);
  })
})
