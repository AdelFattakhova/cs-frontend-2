import { VertexStruct, VertexStructDir } from "./Vertex";

import Stack from "../stack/Stack";
import Queue from "../queue/Queue";

// TODO: add logic when found vertex index is -1

export default class GraphStruct {
  maxVertex = 15;
  vertexCount = 0;
  vertexList: (VertexStruct | VertexStructDir)[];
  directed = false;
  weighted = false;

  constructor(options = {}) {
    for (const key in options) {
      this[key as keyof this] = options[key as keyof typeof options];
    }

    this.vertexList = new Array(this.maxVertex);
  }

  addVertex(label: string) {
    if (this.#getVertexIndex(label) > -1) return;

    if (this.directed) {
      this.vertexList[this.vertexCount] = new VertexStructDir(label);
    } else {
      this.vertexList[this.vertexCount] = new VertexStruct(label);
    }

    this.vertexCount++;
  }

  addEdge(from: string, to: string, weight?: number) {
    if (this.weighted && weight === undefined) {
      throw new Error('Graph is weighted, weight for edge is required');
    }

    if (this.weighted || weight !== undefined) {
      this.weighted = true;
    }

    const fromIndex = this.#getVertexIndex(from);
    const toIndex = this.#getVertexIndex(to);

    const fromEdge = this.weighted ? [from, weight] : from;
    const toEdge = this.weighted ? [to, weight] : to;

    if (this.directed) {
      (this.vertexList[fromIndex] as VertexStructDir).children.push(toEdge);
      (this.vertexList[toIndex] as VertexStructDir).parents.push(fromEdge);

    } else {
      (this.vertexList[fromIndex] as VertexStruct).neighbours.push(toEdge);
      (this.vertexList[toIndex] as VertexStruct).neighbours.push(fromEdge);
    }
  }

  deleteVertex(label: string, vertexList = this.vertexList) {
    if (this.weighted) {
      for (let i = 0; i < this.vertexCount; i++) {
        (vertexList[i] as VertexStructDir).parents
          = (vertexList[i] as VertexStructDir).parents.filter(([parent, _]) => parent !== label);
        (vertexList[i] as VertexStructDir).children
          = (vertexList[i] as VertexStructDir).children.filter(([child, _]) => child !== label);
      }
    } else {
      for (let i = 0; i < this.vertexCount; i++) {
        (vertexList[i] as VertexStructDir).parents
          = (vertexList[i] as VertexStructDir).parents.filter((parent) => parent !== label);
        (vertexList[i] as VertexStructDir).children
          = (vertexList[i] as VertexStructDir).children.filter((child) => child !== label);
      }
    }

    vertexList = vertexList.filter((vertex) => vertex.label !== label);
    this.vertexCount--;
  }

  /* Relations between vertices */

  isParentOf(parent: string, child: string) {
    const parentId = this.#getVertexIndex(parent);
    let hasRelation;

    if (this.directed) {
      hasRelation = !!(this.vertexList[parentId] as VertexStructDir)
        .children.find((i) => i === child);

    } else {
      hasRelation = !!(this.vertexList[parentId] as VertexStruct)
        .neighbours.find((i) => i === child);
    }

    return hasRelation;
  }

  areSiblings(sib1: string, sib2: string) {
    const sibId1 = this.#getVertexIndex(sib1);
    const sibId2 = this.#getVertexIndex(sib2);
    let hasRelation;

    if (this.directed) {
      (this.vertexList[sibId1] as VertexStructDir).parents.forEach((parent1) => {
        hasRelation = !!(this.vertexList[sibId2] as VertexStructDir).parents.find((parent2) => {
          if (this.weighted) {
            return parent1[0] === parent2[0];
          }
          return parent1 === parent2;
        })
      })

    } else {
      hasRelation = !!(this.vertexList[sibId1] as VertexStruct)
        .neighbours.find((i) => i === sib2);
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
      const current = stack.peek() as VertexStruct;
      const adj = this.#findAdjacentVertex(current);

      if (adj > -1) {
        this.vertexList[adj].wasVisited = true;
        searchOrder += this.vertexList[adj].label;
        stack.push(this.vertexList[adj]);
      } else {
        stack.pop();
      }
    }

    console.log(searchOrder);
  }

  breadthFirstSearch() {
    const queue = new Queue();
    this.vertexList[0].wasVisited = true;
    queue.push(this.vertexList[0]);

    let searchOrder = this.vertexList[0].label;

    while (queue.head) {
      const current = queue.pop() as VertexStruct;

      while (this.#findAdjacentVertex(current) > -1) {
        const adj = this.#findAdjacentVertex(current);
        this.vertexList[adj].wasVisited = true;
        queue.push(this.vertexList[adj]);
        searchOrder += this.vertexList[adj].label;
      }
    }

    console.log(searchOrder);
  }

  /* Topological sorting */

  topologicalSort() {
    if (!this.directed) {
      throw new Error('Only directed graph may be sorted topologically');
    }

    const sorted = new Array(this.vertexCount);
    const listCopy = [...this.vertexList];

    while (this.vertexCount > 0) {
      const nextVertex = this.#findLeafVertex();

      if (nextVertex === -1) throw new Error('Graph has a cycle');

      sorted[this.vertexCount - 1] = listCopy[nextVertex].label;
      this.deleteVertex(listCopy[nextVertex].label, listCopy);
    }

    return sorted;
  }

  /* Transitive closure */

  transitiveClosure() {
    if (this.weighted) {
      throw new Error('Transitive closure can be built for non weighted graph only');
    }

    const transList = [...this.vertexList];

    for (let i = 0; i < this.vertexCount; i++) {
      if (this.directed) {
        (this.vertexList[i] as VertexStructDir).children.forEach((label) => {
          const vertexId = this.#getVertexIndex(label);
          (this.vertexList[vertexId] as VertexStructDir).children.forEach((transLabel) => {
            this.addEdge(this.vertexList[i].label, transLabel);
          })
        });

      } else {
        (this.vertexList[i] as VertexStruct).neighbours.forEach((label) => {
          const vertexId = this.#getVertexIndex(label);
          (this.vertexList[vertexId] as VertexStruct).neighbours.forEach((transLabel) => {
            if (!(this.vertexList[i] as VertexStruct).neighbours.includes(transLabel)
              && this.vertexList[i].label !== transLabel) {
              this.addEdge(this.vertexList[i].label, transLabel);
            }
          })
        });
      }
    }

    return transList;
  }

  /* Private helper methods */

  #getVertexIndex(label: string) {
    return this.vertexList.findIndex((vertex) => {
      return vertex?.label === label;
    })
  }

  #findAdjacentVertex(vertex: VertexStruct | VertexStructDir) {
    if (this.directed) {
      return (vertex as VertexStructDir).children.find((i) => !this.vertexList[i].wasVisited);

    } else {
      return (vertex as VertexStruct).neighbours.find((i) => !this.vertexList[i].wasVisited);
    }
  }

  #findLeafVertex() {
    let isLeaf;

    for (let i = 0; i < this.vertexCount; i++) {
      const vertex = this.vertexList[i];
      isLeaf = true;

      if (this.directed) {
        isLeaf = (vertex as VertexStructDir).children.length === 0;

      } else {
        isLeaf = (vertex as VertexStruct).neighbours.length === 0;
      }

      if (isLeaf) return i;
    }

    return -1;
  }

  /* Visualization */

  visualize() {
    var svgn = "http://www.w3.org/2000/svg";
    const graphContainer = document.querySelector('.graph');
    const svgContainer = document.createElementNS(svgn, 'svg');

    for (let i = 0; i < this.vertexCount; i++) {
      const cx = i * 20;
      const cy = i * 40;

      const circle = document.createElementNS(svgn, 'circle');
      circle.setAttribute('cx', `${cx}`);
      circle.setAttribute('cy', `${cy}`);
      circle.setAttribute('r', '20');
      circle.setAttribute('style', 'fill: none; stroke: blue; stroke-width: 2px;');

      const text = document.createElementNS(svgn, 'text');
      text.setAttribute('x', `${cx}`);
      text.setAttribute('y', `${cy}`);
      text.innerHTML = this.vertexList[i].label;
      circle.append(text);

      svgContainer.append(circle);
    }

    graphContainer?.append(svgContainer);
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
