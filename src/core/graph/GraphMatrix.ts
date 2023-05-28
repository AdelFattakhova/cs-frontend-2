import Matrix2D from "../matrix-2d/Matrix2D";
import { Vertex } from "./Vertex";
import Edge from "./Edge";

import Stack from "../stack/Stack";
import Queue from "../queue/Queue";

// TODO: add logic when found vertex index is -1

export default class GraphMatrix {
  maxVertex = 15;
  vertexCount = 0;
  adjMatrix: Matrix2D;
  vertexList: Vertex[];
  directed = false;
  weighted = false;

  constructor(options = {}) {
    for (const key in options) {
      this[key as keyof this] = options[key as keyof typeof options];
    }

    this.adjMatrix = new Matrix2D({ x: this.maxVertex, y: this.maxVertex });
    this.adjMatrix.buffer.fill(0);
    this.vertexList = new Array(this.maxVertex);
  }

  addVertex(label: string) {
    if (this.#getVertexIndex(label) > -1) return;

    this.vertexList[this.vertexCount] = new Vertex(label);
    this.vertexCount++;
  }

  addEdge(from: string, to: string, weight?: number) {
    if (this.weighted && weight === undefined) {
      throw new Error('Graph is weighted, weight for edge is required');
    }

    if (this.weighted || weight !== undefined) {
      this.weighted = true;
      this.addWeightedEdge(from, to, weight);
      return;
    }

    const x = this.#getVertexIndex(from);
    const y = this.#getVertexIndex(to);

    this.adjMatrix.set({ x, y }, 1);

    if (!this.directed)
      this.adjMatrix.set({ x: y, y: x }, 1);
  }

  addWeightedEdge(from: string, to: string, weight?: number) {
    const edge = new Edge(from, to, weight);
    const x = this.#getVertexIndex(from);
    const y = this.#getVertexIndex(to);

    this.adjMatrix.set({ x, y }, edge);

    if (!this.directed)
      this.adjMatrix.set({ x: y, y: x }, edge);
  }

  deleteVertex(label: string) {
    const index = this.#getVertexIndex(label);
    if (index === -1) throw new Error('No such vertex');
    this.vertexList = this.vertexList.filter((_, i) => i !== index);

    for (let row = index; row < this.vertexCount - 1; row++) {
      for (let col = 0; col < this.vertexCount; col++) {
        const nextRow = this.adjMatrix.get({ x: row + 1, y: col });
        this.adjMatrix.set({ x: row, y: col }, nextRow);
      }
    }

    for (let col = index; col < this.vertexCount - 1; col++) {
      for (let row = 0; row < this.vertexCount; row++) {
        const nextCol = this.adjMatrix.get({ x: row, y: col + 1 });
        this.adjMatrix.set({ x: row, y: col }, nextCol);
      }
    }

    this.vertexCount--;
    return label;
  }

  /* Relations between vertices */

  isParentOf(parent: string, child: string) {
    const parentId = this.#getVertexIndex(parent);
    const childId = this.#getVertexIndex(child);

    return !!this.adjMatrix.get({ x: parentId, y: childId });
  }

  areSiblings(sib1: string, sib2: string) {
    const sibId1 = this.#getVertexIndex(sib1);
    const sibId2 = this.#getVertexIndex(sib2);
    let hasRelation;

    for (let i = 0; i < this.vertexCount; i++) {
      hasRelation = !!(this.adjMatrix.get({ x: i, y: sibId1 }) && this.adjMatrix.get({ x: i, y: sibId2 }));

      if (hasRelation) break;
    }

    return hasRelation;
  }

  /* Searches */

  depthFirstSearch() {
    const stack = new Stack(12);
    this.vertexList[0].wasVisited = true;
    stack.push(this.vertexList[0]);

    let searchOrder = this.vertexList[0].label;

    while (!stack.isEmpty()) {
      const current = stack.peek() as Vertex;
      const adj = this.#findAdjacentVertex(current);

      if (adj > -1) {
        this.vertexList[adj].wasVisited = true;
        searchOrder += this.vertexList[adj].label;
        stack.push(this.vertexList[adj]);
      } else {
        stack.pop();
      }
    }

    this.#resetVertexList();

    console.log(searchOrder);
  }

  breadthFirstSearch() {
    const queue = new Queue();
    this.vertexList[0].wasVisited = true;
    queue.push(this.vertexList[0]);

    let searchOrder = this.vertexList[0].label;

    while (queue.head) {
      const current = queue.pop() as Vertex;

      while (this.#findAdjacentVertex(current) > -1) {
        const adj = this.#findAdjacentVertex(current);
        this.vertexList[adj].wasVisited = true;
        queue.push(this.vertexList[adj]);
        searchOrder += this.vertexList[adj].label;
      }
    }

    this.#resetVertexList();

    console.log(searchOrder);
  }

  /* Topological sorting */

  topologicalSort() {
    const sorted = new Array(this.vertexCount);
    let topoCount = this.vertexCount;

    while (topoCount > 0) {
      const nextVertex = this.#findLeafVertex();

      if (nextVertex === -1) throw new Error('Graph has a cycle');

      sorted[topoCount - 1] = this.vertexList[nextVertex].label;
      this.vertexList[nextVertex].wasVisited = true;
      topoCount--;
    }

    this.#resetVertexList();

    return sorted;
  }

  /* Transitive closure */

  transitiveClosure(): Matrix2D {
    if (this.weighted) {
      throw new Error('Transitive closure can be built for non weighted graph only');
    }

    const transMatrix = new Matrix2D({ x: this.maxVertex, y: this.maxVertex });
    transMatrix.buffer = [...this.adjMatrix.buffer];

    for (let row = 0; row < this.vertexCount; row++) {
      for (let col = 0; col < this.vertexCount; col++) {
        if (this.adjMatrix.get({ x: row, y: col })) {
          for (let pairCol = 0; pairCol < this.vertexCount; pairCol++) {
            if (this.adjMatrix.get({ x: col, y: pairCol }) && row !== pairCol) {
              transMatrix.set({ x: row, y: pairCol }, 1);

              if (!this.directed)
                transMatrix.set({ x: pairCol, y: row }, 1);
            }
          }
        }
      }
    }

    return transMatrix;
  }

  /* Private helper methods */

  #getVertexIndex(label: string) {
    return this.vertexList.findIndex((vertex) => {
      return vertex?.label === label;
    })
  }

  #findAdjacentVertex(vertex: Vertex) {
    const vertexId = this.#getVertexIndex(vertex.label);

    for (let i = 0; i < this.vertexCount; i++) {
      if (this.adjMatrix.get({ x: vertexId, y: i })
        && !this.vertexList[i].wasVisited) {
        return i;
      }
    }

    return -1;
  }

  #findLeafVertex() {
    let isLeaf;

    for (let i = 0; i < this.vertexCount; i++) {
      isLeaf = true;

      if (!this.vertexList[i].wasVisited) {
        for (let j = 0; j < this.vertexCount; j++) {
          const edge = this.adjMatrix.get({ x: i, y: j });
          if (edge && edge.from === this.vertexList[i].label
            && (this.vertexList[j].wasVisited === false || typeof this.vertexList[j].wasVisited === 'undefined')) {
            isLeaf = false;
            break;
          }
        }
        if (isLeaf) return i;
      }

    }

    return -1;
  }

  #resetVertexList() {
    this.vertexList.forEach((vertex) => {
      vertex.wasVisited = false;
    })
  }

  /* Visualization */

  visualize(matrix = this.adjMatrix) {
    if (this.vertexCount === 0) return;

    const tableTitle = this.vertexList.reduce((res, vertex) => {
      if (vertex) res += `${vertex.label} | `;
      return res;
    }, '  | ');

    console.log(tableTitle);

    for (let i = 0; i < this.maxVertex; i++) {
      if (!this.vertexList[i]) break;

      let row = `${this.vertexList[i].label} | `;

      for (let j = 0; j < this.maxVertex; j++) {
        if (!this.vertexList[j]) break;

        if (this.weighted) {
          row += `${matrix.get({ x: i, y: j }).weight || 0} | `;
        } else {
          row += `${matrix.get({ x: i, y: j })} | `;
        }
      }

      console.log(row);
    }
  }
}

// TODO: move all commented out lines to test cases

// const graphM = new GraphMatrix({
//   directed: true,
// });
// console.log(graphM.adjMatrix);
// graphM.visualize();

// graphM.addVertex('A');
// graphM.addVertex('B');
// graphM.addVertex('C');
// graphM.addVertex('D');
// graphM.addVertex('E');
// graphM.addVertex('F');
// graphM.addVertex('G');
// graphM.addVertex('H');

// graphM.addEdge('A', 'B', 4);
// graphM.addEdge('A', 'D', 4);
// graphM.addEdge('A', 'H', 5);
// graphM.addEdge('B', 'F', 5);
// graphM.addEdge('C', 'E', 7);
// graphM.addEdge('C', 'F', 9);
// graphM.addEdge('F', 'D', 2);
// graphM.addEdge('F', 'G', 3);

// // console.log(graphM.adjMatrix);
// graphM.visualize();

// console.log(graphM.isParentOf('A', 'D'));
// console.log(graphM.isChildOf('A', 'D'));
// console.log(graphM.isChildOf('D', 'A'));
