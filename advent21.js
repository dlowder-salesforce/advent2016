var Combinatorics = require('js-combinatorics');

var start = 'abcde';

var instructions = [
  "swap position 4 with position 0",
  "swap letter d with letter b",
  "reverse positions 0 through 4",
  "rotate left 1 step",
  "move position 1 to position 4",
  "move position 3 to position 0",
  "rotate based on position of letter b",
  "rotate based on position of letter d"
];

start = 'abcdefgh';

    instructions = [];
    
    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('./input21.txt')
    });
    
    lineReader.on('line', function (line) {
      instructions.push(line);
    });
    
    lineReader.on('close', function () {
      runAdvent21();
    });


var exec = function(s, instruction) {
  var tokens = instruction.split(' ');
  var a = s.split("");
  var temp;
  var p1, p2;
  var i;
  var count;

  if (tokens[0] === 'swap') {
    if (tokens[1] === 'position') {
      p1 = parseInt(tokens[2]);
      p2 = parseInt(tokens[5]);
      temp = a[p1];
      a[p1] = a[p2];
      a[p2] = temp;
    } else { // swapping letters
      p1 = tokens[2];
      p2 = tokens[5];
      for (i = 0; i < a.length; i++) {
        if (a[i] === p1) {
          a[i] = p2;
        } else if (a[i] === p2) {
          a[i] = p1;
        }
      }
    }
  } else if (tokens[0] === 'rotate') {
    if (tokens[1] === 'left') {
      count = parseInt(tokens[2]);
      for (i = 0; i < count; i++) {
        a.push(a.shift());
      }
    } else if (tokens[1] === 'right') {
      count = parseInt(tokens[2]);
      for (i = 0; i < count; i++) {
        a.unshift(a.pop());
      }
    } else { // rotate based on index
      count = s.indexOf(tokens[6]);
      if (count >= 4) {
        count++;
      }
      count++;
      for (i = 0; i < count; i++) {
        a.unshift(a.pop());
      }
    }
  } else if (tokens[0] === 'reverse') {
    p1 = parseInt(tokens[2]);
    p2 = parseInt(tokens[4]);
    while (p1 < p2) {
      temp = a[p1];
      a[p1] = a[p2];
      a[p2] = temp;
      p1++;
      p2--;
    }
  } else if (tokens[0] === 'move') {
    p1 = parseInt(tokens[2]);
    p2 = parseInt(tokens[5]);
    temp = a[p1];
    a.splice(p1,1);
    a = a.slice(0,p2).concat([temp]).concat(a.slice(p2,a.length));
  }
  return a.join("");
};

var runAdvent21 = function() {
  var s = start;

  for (var i=0; i<instructions.length; i++) {
    s = exec(s, instructions[i]);
  }
  console.log(s);

  var permutations = Combinatorics.permutation(['a','b','c','d','e','f','g','h']).toArray();

  var end = 'fbgdceah';
  for (i=0; i<permutations.length; i++) {
    s = permutations[i].join("");
    for (var j=0; j<instructions.length; j++) {
      s = exec(s, instructions[j]);
    }
    if (s === end) {
      console.log(permutations[i].join(""));
      break;
    }
  }

};
    
