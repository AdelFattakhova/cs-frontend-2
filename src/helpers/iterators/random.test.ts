import random from './random';

describe('random numbers generator', () => {
  test('should return an iterator with a value in range', () => {
    const randomInt = random(3, 10);

    expect(randomInt.next().value).toBeGreaterThanOrEqual(3);
    expect(randomInt.next().value).toBeLessThan(10);
  })
})
