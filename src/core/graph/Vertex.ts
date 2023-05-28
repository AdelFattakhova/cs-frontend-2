export class Vertex {
  label: string;
  wasVisited = false;

  constructor(label: string) {
    this.label = label;
  }
}

export class VertexStructDir extends Vertex {
  parents: any[] = [];
  children: any[] = [];

  constructor(label: string) {
    super(label);
  }
}

export class VertexStruct extends Vertex {
  neighbours: any[] = [];

  constructor(label: string) {
    super(label);
  }
}
