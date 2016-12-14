//var input = 'abc';
var input = 'ihaygndm';

md5 = require('js-md5');

var triples = [ '000', '111', '222', '333', '444', '555', '666', '777', '888', '999', 'aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff' ];

var quints = [ '00000', '11111', '22222', '33333', '44444', '55555', '66666', '77777', '88888', '99999', 'aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee', 'fffff' ];
  

var md5map = {};

// Calculate md5 for a string
var repeated_md5 = function(s, n) {
  for (var i=0; i<n; i++) {
    s = md5(s);
  }
  return s;
};

// Memoize md5 results so we don't have to recalculate them
var md5hash = function(s) {
  if (md5map[s] === undefined) {
    // Part 1:
    //md5map[s] = repeated_md5(s, 1);
    // Part 2:
    md5map[s] = repeated_md5(s, 2017);
  }
  return md5map[s];
};

// Does this index produce a key? 
var producesKey = function(n) {
  var hash = md5hash(input + n);

  // Find the first triple
  var index = Number.MAX_VALUE;
  var saved_i = 17;
  for (var i=0; i<16; i++) {
    var index2 = hash.indexOf(triples[i]);
    if (index2 !== -1 && index2 < index) {
      index = index2;
      saved_i = i;
    }
  }
  if (index < Number.MAX_VALUE) {
    // Look for matching quintuplet in the next 1000 integers
    for (var j=0; j<1000; j++) {
      var n2 = n + 1 + j;
      var hash2 = md5hash(input + n2);
      if (hash2.indexOf(quints[saved_i]) !== -1) {
        return true;
      }
    }
  }
  return false;
};

var n = 0;
var foundkeys = [];

while (foundkeys.length < 64) {
  if (producesKey(n)) {
    console.log(n);
    foundkeys.push(n);
  }
  n++;
}

