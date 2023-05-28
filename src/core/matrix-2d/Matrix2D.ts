type Point2D = {
  x: number,
  y: number,
};

// TODO: add tests for 2d matrix

export default class Matrix2D {
  buffer: any[];
  x = 0;
  y = 0;

  constructor(dimensions: Point2D) {
    this.x = dimensions.x;
    this.y = dimensions.y;

    this.buffer = new Array(this.x * this.y);
  }

  #getIndex(coordinates: Point2D) {
    return this.x * coordinates.y + coordinates.x;
  }

  set(coordinates: Point2D, value: any) {
    this.buffer[this.#getIndex(coordinates)] = value;
  }

  get(coordinates: Point2D) {
    return this.buffer[this.#getIndex(coordinates)];
  }
}
