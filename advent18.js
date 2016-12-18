var input = '.^^.^^^..^.^..^.^^.^^^^.^^.^^...^..^...^^^..^^...^..^^^^^^..^.^^^..^.^^^^.^^^.^...^^^.^^.^^^.^.^^.^.';

//input = '.^^.^.^^^^';

var isTrap = function(prevRow, i) {
  var leftIsTrap = i > 0 && prevRow.charAt(i-1) === '^';
  var rightIsTrap = i < (prevRow.length - 1) && prevRow.charAt(i+1) === '^';
  var centerIsTrap = prevRow.charAt(i) === '^';

  return (leftIsTrap && centerIsTrap && !rightIsTrap) ||
        (centerIsTrap && rightIsTrap && !leftIsTrap) ||
        (leftIsTrap && !centerIsTrap && !rightIsTrap) ||
        (!leftIsTrap && !centerIsTrap && rightIsTrap);
};

var buildmap = function(s,n) {
  var map = [];
  map.push(s);
  for (var i=0; i<n-1; i++) {
    debugger;
    var t = "";
    for (var j=0; j<s.length; j++) {
      t = t + (isTrap(s, j) ? '^' : '.');
    }
    map.push(t);
    s = t;
  }
  return map;
};

var countSafeTiles = function(map) {
  var count = 0;
  for (var i=0; i<map.length; i++) {
    for (var j=0; j<map[0].length; j++) {
      if (map[i][j] === '.') {
        count++;
      }
    }
  }
  return count;
};

var finalmap = buildmap(input, 400000);

//console.log(finalmap);

console.log(countSafeTiles(finalmap));

