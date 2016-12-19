var nelves = 3018458;

var msb = function(x) {
  var result = -1;
  debugger;
  for (var i=0; i<32; i++) {
    var y = x >> i;
    if (y % 2 === 1) {
      result = i;
    }
  }
  return result;
};

// Part 1

console.log( ((nelves ^ (1 << msb(nelves))) << 1) + 1 );

var Deque = require('collections/deque');

var left = new Deque();
var right = new Deque();

for(var i=1; i<=nelves; i++) {
  if (i < Math.floor(nelves/2) + 1) {
    left.push(i);
  } else {
    right.unshift(i);
  }
}

while (left.length > 1 && right.length > 1) {
  if(left.length > right.length) {
    left.pop();
  } else {
    right.pop();
  }
  right.unshift(left.shift());
  left.push(right.pop());
}

if(left.length === 1) {
  console.log(left.only());
} else {
  console.log(right.only());
}
 
