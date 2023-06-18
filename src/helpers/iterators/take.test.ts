import take from './take';
import random from './random';

describe('limits iterables to a given amount of iterations', () => {
  test('should take 5 elements from random numbers generator', () => {
    const randomInt = random(0, 100);
    expect([...take(randomInt, 5)].length).toBe(5);
  })

  test('should take 0 elements from random numbers generator', () => {
    const randomInt = random(0, 100);
    expect([...take(randomInt, 0)].length).toBe(0);
  })

  test('should take 14 symbols from string', () => {
    expect([...take('haha yeah yeah yeah okay', 14)].join(''))
      .toMatch('haha yeah yeah');
  })
})
