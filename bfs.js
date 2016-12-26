var Deque = require('collections/deque');

// Helper function for BFS
var buildPath = function(parents, targetNode) {
  var result = [targetNode];
  while (parents[targetNode] !== null) {
    targetNode = parents[targetNode];
    result.push(targetNode);
  }
  return result;
};

// BFS:
//   input adjacency matrix and startNode
//   output map of shortest path for each node that has a valid path from startNode
var bfs = function (adjMatrix, start, end) {
  var parents = [];
  var q = new Deque();
  var v = [];
  var current;
  var lengthmap = {};
  q.push(start);
  parents[start] = null;
  v[start] = true;
  while (q.length) {
    current = q.shift();
    if (end !== undefined && current === end) {
      return buildPath(parents, current);
    }
    lengthmap["" + current] = buildPath(parents, current);
    for (var i = 0; i < adjMatrix.length; i += 1) {
      if (i !== current && adjMatrix[current][i] && !v[i]) {
        parents[i] = current;
        v[i] = true;
        q.push(i);
      }
    }
  }
  return lengthmap;
};

module.exports = bfs;
