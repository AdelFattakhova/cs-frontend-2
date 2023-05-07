type Point3D = {
  x: number,
  y: number,
  z: number
};

export default class Matrix3D {
  buffer: number[] = new Array(0);
  x = 0;
  y = 0;
  z = 0;

  constructor(dimensions: Point3D) {
    this.x = dimensions.x;
    this.y = dimensions.y;
    this.z = dimensions.z;

    this.buffer = new Array(this.x * this.y * this.z);
  }

  #getIndex(coordinates: Point3D) {
    return this.x * this.y * coordinates.z
      + this.x * coordinates.y + coordinates.x;
  }

  set(coordinates: Point3D, value: number) {
    this.buffer[this.#getIndex(coordinates)] = value;
  }

  get(coordinates: Point3D) {
    return this.buffer[this.#getIndex(coordinates)];
  }
}
