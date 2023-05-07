import Matrix3D from './Matrix3D';

describe('3D Matrix', () => {
  test('should add and return values by coordinates', () => {
    const matrix = new Matrix3D({ x: 2, y: 3, z: 2 });

    matrix.set({ x: 0, y: 0, z: 0 }, 0);
    matrix.set({ x: 0, y: 0, z: 1 }, 1);
    matrix.set({ x: 0, y: 1, z: 0 }, 2);
    matrix.set({ x: 1, y: 0, z: 0 }, 3);
    matrix.set({ x: 1, y: 1, z: 0 }, 4);
    matrix.set({ x: 1, y: 0, z: 1 }, 5);
    matrix.set({ x: 0, y: 1, z: 1 }, 6);
    matrix.set({ x: 1, y: 1, z: 1 }, 7);
    matrix.set({ x: 0, y: 2, z: 0 }, 8);
    matrix.set({ x: 1, y: 2, z: 0 }, 9);
    matrix.set({ x: 0, y: 2, z: 1 }, 10);
    matrix.set({ x: 1, y: 2, z: 1 }, 11);

    expect(matrix.get({ x: 0, y: 0, z: 0 })).toBe(0);
    expect(matrix.get({ x: 0, y: 0, z: 1 })).toBe(1);
    expect(matrix.get({ x: 0, y: 1, z: 0 })).toBe(2);
    expect(matrix.get({ x: 1, y: 0, z: 0 })).toBe(3);
    expect(matrix.get({ x: 1, y: 1, z: 0 })).toBe(4);
    expect(matrix.get({ x: 1, y: 0, z: 1 })).toBe(5);
    expect(matrix.get({ x: 0, y: 1, z: 1 })).toBe(6);
    expect(matrix.get({ x: 1, y: 1, z: 1 })).toBe(7);
    expect(matrix.get({ x: 0, y: 2, z: 0 })).toBe(8);
    expect(matrix.get({ x: 1, y: 2, z: 0 })).toBe(9);
    expect(matrix.get({ x: 0, y: 2, z: 1 })).toBe(10);
    expect(matrix.get({ x: 1, y: 2, z: 1 })).toBe(11);
  })
}); 
