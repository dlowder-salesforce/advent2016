
    input = [];
    
    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('./input22.txt')
    });
    
    lineReader.on('line', function (line) {
      if (line.indexOf('/dev') === 0) {
        input.push(line);
      }
    });
    
    lineReader.on('close', function () {
      runAdvent22();
    });

var runAdvent22 = function() {
  var i, j;
  var nodes = [];
  var width = 0;
  var height = 0;
  for (i=0; i<input.length; i++) {
    var a = input[i].match(/\/dev\/grid\/node-x(\d*)-y(\d*) *(\d*)T *(\d*)T *(\d*)T/);
    nodes.push({
      x: parseInt(a[1]),
      y: parseInt(a[2]),
      size: parseInt(a[3]),
      used: parseInt(a[4]),
      av: parseInt(a[5])      
    });
    if (parseInt(a[1]) >= width) {
      width++;
    }
    if (parseInt(a[2]) >= height) {
      height++;
    }
  }

  // Part 1
  var pairs = 0;
  for (i=0; i<nodes.length; i++) {
    for (j=0; j<nodes.length; j++) {
      if (i !== j &&
        nodes[i].used !== 0 &&
        nodes[i].used <= nodes[j].av ) {
        pairs++;
      }
    }
  }
  //console.log(pairs);

  // Part 2

  // Utility functions
  var nodeIdFromXY = function(v) {
    if(v[0] < 0 || v[0] >= width) {
      return null;
    }
    if(v[1] < 0 || v[1] >= height) {
      return null;
    }
    return height*v[0] + v[1];
  };
  
  var XFromNodeId = function(nodeId) {
    return Math.floor(nodeId / height);
  };
  
  var YFromNodeId = function(nodeId) {
    return nodeId % height;
  };
  
  var XYFromNodeId = function(nodeId) {
    return [XFromNodeId(nodeId),YFromNodeId(nodeId)];
  };

  // Part 2: print map for manual solution

  var printMap = function() {
    for (var y=0; y<height; y++) {
      var s = "";
      for (var x=0; x<width; x++) {
        var n = nodeIdFromXY([x,y]);
        if (x === width - 1 && y === 0) {
          s = s + 'S';
        } else if (nodes[n].used > 200) {
          s = s + '#';
        } else if (nodes[n].used === 0) {
          s = s + '_';
        } else {
          s = s + '.';
        }
        //s = s + nodes[n].used + '/' + nodes[n].size + ' ';
      }
      console.log(s);
    }
  };

  printMap();
};
