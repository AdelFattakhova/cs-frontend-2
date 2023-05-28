export default class Edge {
  from: string;
  to: string;
  weight: number | undefined;

  constructor(from: string, to: string, weight?: number) {
    this.from = from;
    this.to = to;

    if (weight !== undefined) {
      this.weight = weight;
    }
  }
}
