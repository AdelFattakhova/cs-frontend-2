import Graph from './Graph';
import GraphStruct from './GraphStruct';
import { VertexStruct, VertexStructDir } from './Vertex';

describe('Graphs', () => {
  // TODO: add tests for other methods

  /* Adjacement struct */

  test('struct: should add new vertex', () => {
    const { graph } = new Graph('struct');

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');

    expect(graph.vertexCount).toBe(3);
    expect(graph.vertexList[0]).toBeInstanceOf(VertexStruct);
    expect(graph.vertexList[0].label).toMatch('A');
    expect(graph.vertexList[1].label).toMatch('B');
    expect(graph.vertexList[2].label).toMatch('C');
  });

  test('struct: should add new edge', () => {
    const { graph } = new Graph('struct');

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');

    expect((graph.vertexList[0] as VertexStruct).neighbours).toContain('B');
    expect((graph.vertexList[1] as VertexStruct).neighbours).toEqual(['A', 'C']);
    expect((graph.vertexList[2] as VertexStruct).neighbours).toContain('B');
  });

  /* Adjacement struct, directed graph*/

  test('struct: should add new edge to directed graph', () => {
    const { graph } = new Graph('struct', { directed: true });

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'C');

    expect((graph.vertexList[0] as VertexStructDir).children).toEqual(['B', 'C']);
    expect((graph.vertexList[0] as VertexStructDir).parents).toEqual([]);
    expect((graph.vertexList[1] as VertexStructDir).children).toEqual(['C']);
    expect((graph.vertexList[1] as VertexStructDir).parents).toEqual(['A']);
    expect((graph.vertexList[2] as VertexStructDir).children).toEqual([]);
    expect((graph.vertexList[2] as VertexStructDir).parents).toEqual(['A', 'B']);
  });

  /* Adjacement struct, weighted graph*/

  test('struct: should throw error when adding edge to weighted graph without weight', () => {
    const { graph } = new Graph('struct', { weighted: true });

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    expect(() => graph.addEdge('A', 'B')).toThrow('Graph is weighted, weight for edge is required');
  });

  test('struct: should add new edge to weighted graph', () => {
    const { graph } = new Graph('struct', { weighted: true });

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addEdge('A', 'B', 3);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'C', 5);

    expect((graph.vertexList[0] as VertexStruct).neighbours).toEqual([['B', 3], ['C', 2]]);
    expect((graph.vertexList[1] as VertexStruct).neighbours).toEqual([['A', 3], ['C', 5]]);
    expect((graph.vertexList[2] as VertexStruct).neighbours).toEqual([['A', 2], ['B', 5]]);
    expect((graph.vertexList[3] as VertexStruct).neighbours).toEqual([]);
  });

  /* Adjacement struct, directed weighted graph*/

  test('struct: should add new edge to directed weighted graph', () => {
    const { graph } = new Graph('struct', { weighted: true, directed: true });

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addEdge('A', 'B', 3);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'C', 5);

    expect((graph.vertexList[0] as VertexStructDir).children).toEqual([['B', 3], ['C', 2]]);
    expect((graph.vertexList[0] as VertexStructDir).parents).toEqual([]);
    expect((graph.vertexList[1] as VertexStructDir).children).toEqual([['C', 5]]);
    expect((graph.vertexList[1] as VertexStructDir).parents).toEqual([['A', 3]]);
    expect((graph.vertexList[2] as VertexStructDir).children).toEqual([]);
    expect((graph.vertexList[2] as VertexStructDir).parents).toEqual([['A', 2], ['B', 5]]);
  });
});
