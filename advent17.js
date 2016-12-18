    var md5 = require('js-md5');
    
    ////////////////////////
    ///// INPUT     ////////
    ////////////////////////
    
    var passcode = 'yjjvjgan';
    
    const width = 4;
    const height = 4;
    
    ////////////////////////
    ///// UTILITIES ////////
    ////////////////////////
    
    //   0   1   2   3
    //   4   5   6   7
    //   8   9  10  11
    //  12  13  14  15
    
    // (x,y) to node ID and back
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
    
    // Direction from node1 to node2
    var direction = function(node1, node2) {
      var v1 = XYFromNodeId(node1);
      var v2 = XYFromNodeId(node2);
      if (v2[1] === v1[1]) {
        if (v2[0] === v1[0]) {
          return null;
        }
        return (v2[0] > v1[0] ? 'R' : 'L');
      } else if (v2[0] === v1[0]) {
        return (v2[1] > v1[1] ? 'D' : 'U');
      } else {
        return null;
      }
    };
    
    // From node, the next node in a particular direction
    // (or null if no such node exists)
    var nextNode = function(node, direction) {
      var v = XYFromNodeId(node);
      switch(direction) {
        case 'R':
          v[0]++;
          break;
        case 'L':
          v[0]--;
          break;
        case 'D':
          v[1]++;
          break;
        case 'U':
          v[1]--;
          break;
      }
      return nodeIdFromXY(v);
    };
    
    // Given a hash, the valid directions where a door may be
    var validDirections = function(hash) {
      var directions = ['U','D','L','R'];
      var valid = [];
      for (var i=0; i<4; i++) {
        if (hash.charAt(i).match(/[b-f]/)) {
          valid.push(directions[i]);
        }
      }
      return valid;
    };
    
    // Given a node, and the current string of directions in the path followed,
    // find all reachable neighboring nodes
    var neighbors = function(string, node) {
      string = passcode + string;
      string = md5(string);
      var valid = validDirections(string);
      var v = [];
      for (var i=0; i<valid.length; i++) {
        var n = nextNode(node,valid[i]);
        if (n !== null) {
          v.push(n);
        }
      }
      return v;
    };
     
    
    // DFS to find all valid paths
    var searchNext = function(paths, string, start, end) {
      if (start === end) {
        paths.push(string);
        return;
      }
      var n = neighbors(string, start);
      for (var i=0; i<n.length; i++) {
        var d = direction(start, n[i]);
        searchNext(paths, string + d, n[i], end);
      }
    };
    
    var findAllGoodPaths = function() {
      var paths = [];
      searchNext(paths, "", 0, nodeIdFromXY([width-1, height-1]));
      return paths;
    };
    
    var goodpaths = findAllGoodPaths();
    
    // Part 1
    var shortpath = goodpaths.reduce(function(a,b) {return (a.length < b.length ? a : b);});
    console.log(shortpath);
    // Part 2
    var longpath = goodpaths.reduce(function(a,b) {return (a.length > b.length ? a : b);});
    console.log(longpath.length);
