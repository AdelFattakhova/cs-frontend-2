import Graph from './Graph.js';

// TODO: finish graph visualization via SVG

// const graph = new Graph('matrix', { directed: false }).graph;
const graph = new Graph('struct', { directed: true }).graph;


graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
// graph.addVertex('F');
// graph.addVertex('G');
// graph.addVertex('H');
// AC, AA?, BE, BB?, CC?, CD
graph.addEdge('A', 'B'); // BA
graph.addEdge('A', 'D');
// graph.addEdge('A', 'H');
graph.addEdge('B', 'C'); // CB
graph.addEdge('C', 'E'); // EC
graph.addEdge('D', 'E'); // ED
// graph.addEdge('C', 'F');
// graph.addEdge('F', 'D');
// graph.addEdge('F', 'G');
// graph.addEdge('G', 'C');

// graph.visualize();
// console.log('---------');

// graph.addVertex('Проснуться');
// graph.addVertex('Начать работать');
// graph.addVertex('Поправить список дел');
// graph.addVertex('Собрать вещи');
// graph.addVertex('Посмотреть доску');
// graph.addVertex('Проверить почту');
// graph.addVertex('Позавтракать');
// graph.addVertex('Проверить портал');
// graph.addVertex('Поздороваться');
// graph.addVertex('Сходить в душ');
// graph.addVertex('Сделать зарядку');
// graph.addVertex('Доехать до офиса');
// graph.addVertex('Одеться');

// graph.addEdge('Проснуться', 'Сделать зарядку', 2);
// graph.addEdge('Сделать зарядку', 'Сходить в душ', 15);
// graph.addEdge('Сходить в душ', 'Позавтракать', 5);
// graph.addEdge('Позавтракать', 'Собрать вещи', 30);
// graph.addEdge('Позавтракать', 'Одеться', 30);
// graph.addEdge('Собрать вещи', 'Доехать до офиса', 5);
// graph.addEdge('Одеться', 'Доехать до офиса', 5);
// graph.addEdge('Доехать до офиса', 'Начать работать', 50);
// graph.addEdge('Поздороваться', 'Проверить портал', 1);
// graph.addEdge('Поздороваться', 'Проверить почту', 1);
// graph.addEdge('Поздороваться', 'Посмотреть доску', 1);
// graph.addEdge('Поздороваться', 'Поправить список дел', 1);
// graph.addEdge('Поправить список дел', 'Начать работать', 5);
// graph.addEdge('Посмотреть доску', 'Начать работать', 3);
// graph.addEdge('Проверить почту', 'Начать работать', 2);
// graph.addEdge('Проверить портал', 'Начать работать', 5);

// console.log(graph.areSiblings('Проверить портал', 'Проверить почту'));
// console.log(graph.areSiblings('Проверить портал', 'Одеться'));

// graph.visualize(graph.transitiveClosure() as Matrix2D);
graph.visualize();

// console.log(graph.vertexList);
// console.log(graph.topologicalSort());
// console.log(graph.transitiveClosure());

// graph.deleteVertex('F');

// graph.depthFirstSearch();
// graph.breadthFirstSearch();

// console.log(graph.isParentOf('A', 'D'));
// console.log(graph.isChildOf('A', 'D'));
// console.log(graph.isChildOf('D', 'A'));
