var input = [
  "Disc #1 has 13 positions; at time=0, it is at position 1.",
  "Disc #2 has 19 positions; at time=0, it is at position 10.",
  "Disc #3 has 3 positions; at time=0, it is at position 2.",
  "Disc #4 has 7 positions; at time=0, it is at position 1.",
  "Disc #5 has 5 positions; at time=0, it is at position 3.",
  "Disc #6 has 17 positions; at time=0, it is at position 5.",
  "Disc #7 has 11 positions; at time=0, it is at position 0."
];

//input = [
//  "Disc #1 has 5 positions; at time=0, it is at position 4.",
//  "Disc #2 has 2 positions; at time=0, it is at position 1.",
//];

var base = [];
var start = [];

for (var i=0; i<input.length; i++) {
  var tokens = input[i].split(' ');
  base.push(parseInt(tokens[3]));
  start.push(parseInt(tokens[11]));
}

console.log(base);
console.log(start);

var t = -start[0]; 
var found = false;

debugger;
while(!found) {
  t += base[0];
  found = true;
  for (var j=0; j<base.length; j++) {
    if ( ((start[j] + t + j) % base[j]) !== 0 ) {
      found = false;
    }
  }
}

console.log(t - 1);
