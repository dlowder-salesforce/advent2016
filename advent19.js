    var nelves = 3018458;
    
    // Most significant bit
    var msb = function(x) {
      var result = -1;
      for (var i=0; i<32; i++) {
        var y = x >> i;
        if (y % 2 === 1) {
          result = i;
        }
      }
      return result;
    };
    
    var Deque = require('collections/deque');
    
    // Part 1 (closed form)
    
    // Subtract largest power of two in nelves, then multiply by two and add 1
    console.log( ((nelves ^ (1 << msb(nelves))) << 1) + 1 );
    
    // Part 1 (actual simulation)
    
    var part1 = function(n) {
      var left = new Deque();
      var right = new Deque();
      for (var i=1; i<=n; i++) {
        left.push(i);
      }
    
      while (left.length > 1) { 
        while (left.length > 1) {
          // First element in left takes packages of second element:
          // Move first element to right queue and remove second element
          right.push(left.shift());
          left.shift();
        }
        // If we have one element remaining in left, prepend it to the beginning of right
        if (left.length === 1) {
          right.unshift(left.shift());
        }
        // left is now empty, so swap right and left and repeat
        var temp = left;
        left = right;
        right = temp;
      }
      
      if(left.length === 1) {
        return left.only();
      } else {
        return right.only();
      }
    };
    
    console.log(part1(nelves));
    
    // Part 2
    
    var part2 = function(n) {
    
      // each queue has half the elements  
      var left = new Deque();
      var right = new Deque();
      for(var i=1; i<=n; i++) {
        if (i < Math.floor(n/2) + 1) {
          left.push(i);
        } else {
          right.push(i);
        }
      }
      
      while (left.length > 1 && right.length > 1) {
        // Remove the element in the middle (either the end of the left queue or the
        // beginning of the right queue)
        if(left.length > right.length) {
          left.pop();
        } else {
          right.shift();
        }
        // Rotate: beginning of right goes to end of left, and vice versa
        left.push(right.shift());
        right.push(left.shift());
      }
      
      if(left.length === 1) {
        return left.only();
      } else {
        return right.only();
      }
    };
    
    console.log(part2(nelves));
