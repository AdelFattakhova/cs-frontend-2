import Graph from './Graph';
import GraphMatrix from './GraphMatrix';
import GraphStruct from './GraphStruct';

describe('Graphs', () => {
  /* Adjacement matrix */

  test('matrix: should create an empty instance of graph', () => {
    const { graph } = new Graph('matrix');

    expect(graph).toBeInstanceOf(GraphMatrix);
    expect(graph.vertexCount).toBe(0);
    expect(graph.vertexList.length).toBe(15);
    expect((graph as GraphMatrix).adjMatrix.buffer.length).toBe(225);
    expect(graph.directed).toBe(false);
    expect(graph.weighted).toBe(false);
  });

  test('matrix: should create an empty instance of directed graph', () => {
    const { graph } = new Graph('matrix', { directed: true });

    expect(graph).toBeInstanceOf(GraphMatrix);
    expect(graph.vertexCount).toBe(0);
    expect(graph.vertexList.length).toBe(15);
    expect((graph as GraphMatrix).adjMatrix.buffer.length).toBe(225);
    expect(graph.directed).toBe(true);
    expect(graph.weighted).toBe(false);
  });

  test('matrix: should create an empty instance of weighted graph', () => {
    const { graph } = new Graph('matrix', { weighted: true });

    expect(graph).toBeInstanceOf(GraphMatrix);
    expect(graph.vertexCount).toBe(0);
    expect(graph.vertexList.length).toBe(15);
    expect((graph as GraphMatrix).adjMatrix.buffer.length).toBe(225);
    expect(graph.directed).toBe(false);
    expect(graph.weighted).toBe(true);
  });

  test('struct: should create an empty instance of graph', () => {
    const { graph } = new Graph('struct');

    expect(graph).toBeInstanceOf(GraphStruct);
    expect(graph.vertexCount).toBe(0);
    expect(graph.vertexList.length).toBe(15);
    expect(graph.directed).toBe(false);
    expect(graph.weighted).toBe(false);
  });

  test('struct: should create an empty instance of directed graph', () => {
    const { graph } = new Graph('struct', { directed: true });

    expect(graph).toBeInstanceOf(GraphStruct);
    expect(graph.vertexCount).toBe(0);
    expect(graph.vertexList.length).toBe(15);
    expect(graph.directed).toBe(true);
    expect(graph.weighted).toBe(false);
  });

  test('struct: should create an empty instance of weighted graph', () => {
    const { graph } = new Graph('struct', { weighted: true });

    expect(graph).toBeInstanceOf(GraphStruct);
    expect(graph.vertexCount).toBe(0);
    expect(graph.vertexList.length).toBe(15);
    expect(graph.directed).toBe(false);
    expect(graph.weighted).toBe(true);
  });
});
