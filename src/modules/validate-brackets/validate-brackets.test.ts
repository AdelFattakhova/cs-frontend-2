import validateBrackets from './validate-brackets';

describe('should validate brackets in string', () => {
  test('should return true for valid strings', () => {
    expect(validateBrackets('(hello{world} and [me])')).toBe(true);
    expect(validateBrackets('([]{})')).toBe(true);
    expect(validateBrackets('()')).toBe(true);
  });

  test('should return false for invalid strings', () => {
    expect(validateBrackets('hello{world and [me')).toBe(false);
    expect(validateBrackets('][')).toBe(false);
    expect(validateBrackets(')')).toBe(false);
    expect(validateBrackets('{')).toBe(false);
    expect(validateBrackets('')).toBe(false);
  });
});
