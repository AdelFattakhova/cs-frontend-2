export default class Range {
  type: 'string' | 'number';
  start = 0;
  end = 0;
  cursor: number;

  constructor(start: string | number, end: string | number) {
    this.type = typeof start as ('string' | 'number');

    switch (this.type) {
      case 'string':
        this.start = (start as string).codePointAt(0)!;
        this.end = (end as string).codePointAt(0)!;
        break;
      case 'number':
        this.start = start as number;
        this.end = end as number;
        break;

      default:
        break;
    }

    this.cursor = this.start;
  }

  getValue() {
    if (this.type === 'string') {
      return String.fromCodePoint(this.cursor as number);
    }
    return this.cursor;
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    if (this.cursor <= this.end) {
      const next = { value: this.getValue(), done: false };
      this.cursor++;
      return next;
    }

    this.cursor = this.start;

    return { value: undefined, done: true };
  }

  nextReversed = () => {
    if (this.cursor >= this.start) {
      const next = { value: this.getValue(), done: false };
      this.cursor--;
      return next;
    }

    this.cursor = this.end;

    return { value: undefined, done: true };
  }

  reverse = () => {
    this.cursor = this.end;

    return {
      [Symbol.iterator]() {
        return this;
      },

      next: this.nextReversed
    };
  }
}
