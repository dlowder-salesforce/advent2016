var Bfs = require('./bfs');
var Combinatorics = require('js-combinatorics');

input = [];
    
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./input24.txt')
});
    
lineReader.on('line', function (line) {
  input.push(line.split(''));
});
    
lineReader.on('close', function () {
  runAdvent24();
});

var height;
var width;

var nodeIdFromXY = function(v) {
    if(v[0] < 0 || v[0] >= width) {
      return null;
    }
    if(v[1] < 0 || v[1] >= height) {
      return null;
    }
    return width*v[1] + v[0];
};
  
var XFromNodeId = function(nodeId) {
    return nodeId % width;
};
  
var YFromNodeId = function(nodeId) {
    return Math.floor(nodeId / width);
};
  
var XYFromNodeId = function(nodeId) {
    return [XFromNodeId(nodeId),YFromNodeId(nodeId)];
};
  
var runAdvent24 = function() {

  debugger; 

  height = input.length;
  width = input[0].length;

  var nnodes = height*width;

  var deltas = [ [-1,0], [1,0], [0,-1], [0,1] ];

  var i, j;
  var adjMatrix = [];
  
  var start;
  var goals = [];
  for (i=0; i<nnodes; i++) {
    var row = [];
    for (j=0; j<nnodes; j++) {
      row.push(false);
    }
    adjMatrix.push(row);
  }
  for (i=0; i<nnodes; i++) {
    var xy_i = XYFromNodeId(i);
    var c = input[xy_i[1]][xy_i[0]];
    if(c === '0') {
      start = i;
    } else if(c.match(/[1-9]/)) {
      goals.push(i);
    }
    if (c !== '#') {
      for (var k=0; k<deltas.length; k++) {
        var xy_j = [xy_i[0] + deltas[k][0], xy_i[1] + deltas[k][1]];
        var n = nodeIdFromXY(xy_j);
        if (n != null && input[xy_j[1]][xy_j[0]] !== '#') {
          adjMatrix[i][n] = true;
        }
      }
    }
  }

  var minpath1 = Number.MAX_VALUE;
  var minpath2 = Number.MAX_VALUE;

  var pathmap = {};
  for (i=0; i<goals.length; i++) {
    pathmap["" + start + "," + goals[i]] = Bfs(adjMatrix, start, goals[i]).length - 1;
    pathmap["" + goals[i] + "," + start] = pathmap["" + start + "," + goals[i]];
    for (j=0; j<i; j++) {
      pathmap["" + goals[j] + "," + goals[i]] = Bfs(adjMatrix, goals[j], goals[i]).length - 1;
      pathmap["" + goals[i] + "," + goals[j]] = pathmap["" + goals[j] + "," + goals[i]]; 
    }
  }

  var p = Combinatorics.permutation(goals).toArray();

  debugger;
 
  for (i=0; i<p.length; i++) {
    var path = pathmap["" + start + "," + p[i][0]];
    for (j=0; j<p[i].length-1; j++) {
      path += pathmap["" + p[i][j] + "," + p[i][j+1]];
    }
    if (path < minpath1) {
      minpath1 = path;
    }
    path += pathmap["" + p[i][p[i].length-1] + "," + start];
    if (path < minpath2) {
      minpath2 = path;
    }
  }
  console.log(minpath1);
  console.log(minpath2);      

};
