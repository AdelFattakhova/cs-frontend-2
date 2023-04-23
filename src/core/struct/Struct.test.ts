import Struct from './Struct';

describe(('struct'), () => {
  test('should correctly set and get value for the specified field', () => {
    const jackBlack = new Struct([
      ['name', 'utf16', 10],
      ['lastName', 'utf16', 10],
      ['age', 'u16'],
      ['occupation', 'utf16', 20],
    ]);

    jackBlack.set('name', 'Jack');
    jackBlack.set('lastName', 'Black');
    jackBlack.set('age', 56);
    jackBlack.set('occupation', 'software engineer');

    expect(jackBlack.get('name')).toMatch('Jack');
    expect(jackBlack.get('age')).toEqual(56);
    expect(jackBlack.get('occupation')).toMatch('software engineer');
  });

  test('should throw exception when data types don\'t match', () => {
    const jackBlack = new Struct([
      ['name', 'utf16', 10],
      ['lastName', 'utf16', 10],
      ['age', 'u16'],
      ['occupation', 'utf16', 20],
    ]);

    expect(() => jackBlack.set('name', 146)).toThrow('Value type does not match the schema');
    expect(() => jackBlack.set('age', '146')).toThrow('Value type does not match the schema');
  });

  test('should throw exception when memory capacity doesn\'t match', () => {
    const jackBlack = new Struct([
      ['name', 'utf16', 10],
      ['lastName', 'utf16', 10],
      ['age', 'u16'],
      ['occupation', 'utf16', 20],
    ]);

    expect(() => jackBlack.set('name', 'Jackyshawny')).toThrow('Amount of memory required for provided value exceeds memory allocated for this field');
    expect(() => jackBlack.set('age', 99999)).toThrow('Amount of memory required for provided value exceeds memory allocated for this field');
  });

  test('should throw exception when non-existing field is requested', () => {
    const jackBlack = new Struct([
      ['name', 'utf16', 10],
      ['lastName', 'utf16', 10],
      ['age', 'u16'],
      ['occupation', 'utf16', 20],
    ]);

    expect(() => jackBlack.set('firstName', 'Jacky')).toThrow('No such field');
    expect(() => jackBlack.get('firstName')).toThrow('No such field');
  });
});
