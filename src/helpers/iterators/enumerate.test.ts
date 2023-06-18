import enumerate from './enumerate';

describe('iterables enumerator', () => {
  test('for string: should return pairs with correct iteration number', () => {
    const iterator = enumerate('avenge');

    const firstIt = iterator.next();
    expect(firstIt.value).toEqual([0, 'a']);

    const secondIt = iterator.next();
    expect(secondIt.value).toEqual([1, 'v']);

    const thirdIt = iterator.next();
    expect(thirdIt.value).toEqual([2, 'e']);

    iterator.next();
    iterator.next();
    iterator.next();
    const lastIt = iterator.next();
    expect(lastIt.value).toEqual(undefined);
    expect(lastIt.done).toBe(true);
  })

  test('for array: should return pairs with correct iteration number', () => {
    const iterator = enumerate([0, 1, 2]);

    const firstIt = iterator.next();
    expect(firstIt.value).toEqual([0, 0]);

    const secondIt = iterator.next();
    expect(secondIt.value).toEqual([1, 1]);

    const thirdIt = iterator.next();
    expect(thirdIt.value).toEqual([2, 2]);

    iterator.next();
    iterator.next();
    iterator.next();
    expect(iterator.next().value).toBeUndefined;
  })
})
