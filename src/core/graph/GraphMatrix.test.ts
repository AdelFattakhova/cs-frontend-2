import Graph from './Graph';
import GraphMatrix from './GraphMatrix';
import { Vertex } from './Vertex';
import Edge from './Edge';

describe('Graph using adjacement matrix', () => {
  // TODO: add tests for other methods

  /* Adjacement matrix */

  test('matrix: should add new vertex', () => {
    const { graph } = new Graph('matrix');

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');

    expect(graph.vertexCount).toBe(3);
    expect(graph.vertexList[0]).toBeInstanceOf(Vertex);
    expect(graph.vertexList[0].label).toMatch('A');
    expect(graph.vertexList[1].label).toMatch('B');
    expect(graph.vertexList[2].label).toMatch('C');
  });

  test('matrix: should add new edge', () => {
    const { graph } = new Graph('matrix');

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'D');
    graph.addEdge('B', 'C');
    graph.addEdge('C', 'E');
    graph.addEdge('D', 'E');

    expect((graph as GraphMatrix).adjMatrix.get({ x: 0, y: 1 })).toBe(1);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 0, y: 3 })).toBe(1);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 1, y: 0 })).toBe(1);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 3, y: 0 })).toBe(1);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 1, y: 2 })).toBe(1);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 2, y: 1 })).toBe(1);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 2, y: 4 })).toBe(1);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 4, y: 2 })).toBe(1);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 3, y: 4 })).toBe(1);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 4, y: 3 })).toBe(1);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 2, y: 3 })).toBe(0);
  });

  /* Adjacement matrix, directed graph*/

  test('matrix: should add new edge to directed graph', () => {
    const { graph } = new Graph('matrix', { directed: true });

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'D');
    graph.addEdge('B', 'C');
    graph.addEdge('C', 'E');
    graph.addEdge('D', 'E');

    expect((graph as GraphMatrix).adjMatrix.get({ x: 0, y: 1 })).toBe(1);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 1, y: 0 })).toBe(0);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 1, y: 2 })).toBe(1);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 2, y: 1 })).toBe(0);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 2, y: 4 })).toBe(1);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 4, y: 2 })).toBe(0);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 3, y: 4 })).toBe(1);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 4, y: 3 })).toBe(0);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 2, y: 3 })).toBe(0);
  });

  /* Adjacement matrix, weighted graph*/

  test('matrix: should throw error when adding edge to weighted graph without weight', () => {
    const { graph } = new Graph('matrix', { weighted: true });

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    expect(() => graph.addEdge('A', 'B')).toThrow('Graph is weighted, weight for edge is required');
  });

  test('matrix: should add new edge to weighted graph', () => {
    const { graph } = new Graph('matrix', { weighted: true });

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addEdge('A', 'B', 6);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 0, y: 1 })).toBeInstanceOf(Edge);
    expect((graph as GraphMatrix).adjMatrix.get({ x: 0, y: 1 }).weight).toBe(6);
  });
});
