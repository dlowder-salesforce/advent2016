var bfs = require('./bfs');

var hammingWeight = function(v) {
  v = v - ((v>>1) & 0x55555555);
  v = (v & 0x33333333) + ((v>>2) & 0x33333333);
  return ((v + (v>>4) & 0xF0F0F0F) * 0x1010101) >> 24;
};

var width = 40;
var height = 40;

var favoriteNumber = 1362;

var start = [1, 1];

var end = [31, 39];

var nodeIdFromXY = function(v) {
  return width*v[1] + v[0];
};

var XFromNodeId = function(nodeId) {
  return nodeId % width;
};

var YFromNodeId = function(nodeId) {
  return Math.floor(nodeId / width);
};

var isWall = function(x, y) {
  return hammingWeight((x*x + 3*x + 2*x*y + y + y*y) + favoriteNumber) % 2 === 1;
};


var printMap = function() {
  for (var j=0; j<height; j++) {
    s = '';
    for (var i=0; i<width; i++) {
      if (start === [i,j]) {
        s = s + 'S';
      } else if (end === [i,j]) {
        s = s + 'E';
      } else if (isWall(i,j)) {
        s = s + '#';
      } else {
        s = s + '.';
      }
    }
    console.log(s);
  }
};

var adjacencyMatrix = function() {
  var a = [];
  for (var i=0; i<height*width; i++) {
    var c = [];
    for (var j=0; j<height*width; j++) {
      c.push(false);
    }
    var x = XFromNodeId(i);
    var y = YFromNodeId(i);
    if (x - 1 >=0 && !isWall(x - 1,y)) {
      c[nodeIdFromXY([x - 1, y])] = true;
    }
    if (x + 1 < width && !isWall(x + 1,y)) {
      c[nodeIdFromXY([x + 1, y])] = true;
    }
    if (y - 1 >= 0 && !isWall(x, y - 1)) {
      c[nodeIdFromXY([x, y - 1])] = true;
    }
    if (y + 1 < height && !isWall(x, y + 1)) {
      c[nodeIdFromXY([x, y + 1])] = true;
    }
    a.push(c);
  }
  return a;
};

console.log('Part 1:');

var path = bfs(adjacencyMatrix(), nodeIdFromXY(start), nodeIdFromXY(end));

console.log(path.length - 1);

console.log('Part 2:');

var count = 0;
for (var i=0; i<height*width; i++) {
  if(!isWall([XFromNodeId(i),YFromNodeId(i)])) {
    var spath = bfs(adjacencyMatrix(), nodeIdFromXY(start), i);
    if (spath && spath.length <= 51) {
      count++;
    }
  }
}
console.log(count);



