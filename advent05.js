var input = 'abc';
input = 'uqwqemis';

md5 = require('js-md5');

var output = ['x','x','x','x','x','x','x','x'];

var i = 0;

while (output.indexOf('x') !== -1) {
  var checksum = md5(input + i);
  if (checksum.indexOf('00000') === 0) {
    var loc = parseInt(checksum.substring(5,6));
    var c = checksum.substring(6,7);
    if (loc >= 0 && loc < 8 && output[loc] === 'x') {
      output[loc] = c;
    }
    console.log(i);
    console.log(output);
  }
  i++;
}
