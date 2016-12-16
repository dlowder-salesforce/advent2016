var initialState = '10000';

var finalLength = 20;
initialState = '01111001100111011';

// Part 1
finalLength = 272;
// Part 2
finalLength = 35651584;

String.prototype.reverse = function() {
  var result = "";
  for (var i=0; i<this.length; i++) {
    result = result + this.charAt(this.length - 1 - i);
  }
  return result;
};

var nextState = function(a) {
  return a + '0' + a.reverse().replace(/0/g,'2').replace(/1/g,'0').replace(/2/g,'1');
};

var nextChecksum = function(s) {
  debugger;
  var result = '';
  for (var i=0; i<(s.length-1); i+=2) {
    if (s.charAt(i) == s.charAt(i+1)) {
      result = result + '1';
    } else {
      result = result + '0';
    }
  }
  return result;
};

var data = initialState;

while (data.length < finalLength) {
  data = nextState(data);
}

data = data.substring(0, finalLength);

console.log(data);

checksum = nextChecksum(data);

while (checksum.length % 2 != 1) {
  checksum = nextChecksum(checksum);
}

console.log(checksum);
