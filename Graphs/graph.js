const Queue = require("../Queue/queue-list");
class Graph {
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    this.adjacencyList.set(vertex, []);
  }

  addEdge(vertex1, vertex2) {
    if (this.adjacencyList.has(vertex1) && this.adjacencyList.has(vertex2)) {
      this.adjacencyList.get(vertex1).push(vertex2);
      this.adjacencyList.get(vertex2).push(vertex1);
    }
  }

  print() {
    for (const [key, value] of this.adjacencyList) {
      const connectedVertices = value;
      console.log(key, "------->", connectedVertices);
    }
  }

  // O(E) time, O(E) space
  BFS(sourceVertex, visited) {
    const queue = new Queue();
    visited[sourceVertex] = true;
    queue.push(sourceVertex);
    let result = [];
    while (!queue.empty()) {
      const currVertex = queue.pop();
      result.push(currVertex);
      const connectedVertices = this.adjacencyList.get(currVertex) || [];
      for (const vertex of connectedVertices) {
        if (!visited[vertex]) {
          visited[vertex] = true;
          queue.push(vertex);
        }
      }
    }
    console.log(result);
  }

  // O(V + E) time, O(E) space
  connectedComponents() {
    const vertices = this.adjacencyList.keys();
    const visited = {};
    let count = 0;
    for (const vertex of vertices) {
      if (!visited[vertex]) {
        this.BFS(vertex, visited);
        count += 1;
      }
    }
    return count;
  }

  DFS(sourceVertex, visited) {
    visited[sourceVertex] = true;
    console.log(sourceVertex);
    const connectedVertices = this.adjacencyList.get(sourceVertex) || [];
    for (const vertex of connectedVertices) {
      if (!visited[vertex]) {
        visited[vertex] = true;
        this.DFS(vertex, visited);
      }
    }
  }

  // O(V + E) time, O(E) space
  connectedComponentsDFS() {
    const vertices = this.adjacencyList.keys();
    const visited = {};
    let count = 0;
    for (const vertex of vertices) {
      if (!visited[vertex]) {
        this.DFS(vertex, visited);
        count += 1;
      }
    }
    return count;
  }

  // O(E) time, O(E) space
  shortestPathInUnweightedGraph(sourceVertex) {
    const visited = {};
    const distance = {};
    const queue = new Queue();
    visited[sourceVertex] = true;
    distance[sourceVertex] = 0;
    queue.push(sourceVertex);
    while (!queue.empty()) {
      const currVertex = queue.pop();
      const connectedVertices = this.adjacencyList.get(currVertex) || [];
      for (const vertex of connectedVertices) {
        if (!visited[vertex]) {
          visited[vertex] = true;
          distance[vertex] = distance[currVertex] + 1;
          queue.push(vertex);
        }
      }
    }
    return distance;
  }

  dijkstraShortedPath(sourceVertex) {
    const distances = {};
    const visited = new Set();
    const vertices = this.adjacencyList.keys();
    for (const vertex of vertices) {
      distances[vertex] = Infinity;
    }
    distances[sourceVertex] = 0;
    // This is a simple implementation to understand better. We can use Min Heap instead to reduce the time complexity
    while (vertices.length) {
      vertices.sort((a, b) => distances[a] - distances[b]);
      let closestVertex = vertices.shift();
      // If the shortest distance to the closest node is still Infinity, then remaining nodes are unreachable and we can break
      if (distances[closestVertex] === Infinity) break;
      visited.add(closestVertex);
      const connectedVertices = this.adjacencyList.get(closestVertex) || [];
      for (const vertex of connectedVertices) {
        if (!visited.has(vertex)) {
          // This has to be calculated in a specific way. For now we have not represented weighted graph
          const newDistance =
            distances[closestVertex] + this.adjacencyList.get(closestVertex);
          if (newDistance < distances[vertex]) {
            distances[vertex] = newDistance;
          }
        }
      }
    }
    return visited;
  }

  /*
  Kosaraju's Algorithm
  -------------------------->
  1) Order the vertices in decreasing order of finish times in DFS
  2) Reverse all edges
  3) Do DFS of the reversed graph in the order obtained in 1. For every vertex, print all reachable vertices on one SCC.
  */
}

module.exports = Graph;
