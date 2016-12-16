// Example
var initialState = '10000'.split("").map(function(x) {return parseInt(x);});

var finalLength = 20;

initialState = '01111001100111011'.split("").map(function(x) {return parseInt(x);});

// Part 1
finalLength = 272;
// Part 2
finalLength = 35651584;

var nextState = function(a) {
  var r = a.map(function(x) {
    return (x === 0 ? 1 : 0);
  }).reverse();
  return a.concat([0].concat(r));
};

var nextChecksum = function(s) {
  var result = [];
  for (var i=0; i<(s.length-1); i+=2) {
    result.push( (s[i] == s[i+1]) ? 1 : 0);
  }
  return result;
};

var data = initialState;

while (data.length < finalLength) {
  data = nextState(data);
}

data = data.slice(0, finalLength);

console.log(data.join(""));

checksum = nextChecksum(data);

while (checksum.length % 2 != 1) {
  checksum = nextChecksum(checksum);
}

console.log(checksum.join(""));
