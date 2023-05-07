# 3D Matrix
Class for creating 3-dimensional matrix based on 1-dimensional array.

## `Matrix3D(dimensions: Point3D)`
* `dimensions`: object of type Point3D, provides x, y and z sizes of the matrix

## `set(coordinates: Point3D, value: number)`
Adds new value to the matrix by provided coordinates. Example:

  ```js
  const matrix = new Matrix3D({ x: 2, y: 3, z: 2 });

  matrix.set({ x: 0, y: 0, z: 0 }, 0);
  matrix.set({ x: 0, y: 0, z: 1 }, 1);
  matrix.set({ x: 0, y: 1, z: 0 }, 2);
  ```

## `get(coordinates: Point3D)`
Returns value by coordinates. Example:

```js
  console.log(matrix.get({ x: 0, y: 0, z: 0 })); // 0
  console.log(matrix.get({ x: 0, y: 0, z: 1 })); // 1
  console.log(matrix.get({ x: 0, y: 1, z: 0 })); // 2
```
