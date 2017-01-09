/*
ADVENT contains no markers and decompresses to itself with no changes, resulting in a decompressed length of 6.
A(1x5)BC repeats only the B a total of 5 times, becoming ABBBBBC for a decompressed length of 7.
(3x3)XYZ becomes XYZXYZXYZ for a decompressed length of 9.
A(2x2)BCD(2x2)EFG doubles the BC and EF, becoming ABCBCDEFEFG for a decompressed length of 11.
(6x1)(1x3)A simply becomes (1x3)A - the (1x3) looks like a marker, but because it's within a data section of another marker, it is not treated any differently from the A that comes after it. It has a decompressed length of 6.
X(8x2)(3x3)ABCY becomes X(3x3)ABC(3x3)ABCY (for a decompressed length of 18), because the decompressed data from the (8x2) marker (the (3x3)ABC) is skipped and not processed further.
 */

var input = "";
   
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./input09.txt')
});
   
lineReader.on('line', function (line) {
  input += line;
});
   
lineReader.on('close', function () {
  runAdvent09();
});


var uncompressedLength = function (s, recurse) {
  var total = 0;
  var i = 0;
  while (i < s.length) {
    if (s[i] === '(') {
      var j = s.indexOf(')',i);
      var marker = s.substring(i+1,j).split('x').map(function(x) {return parseInt(x);});
      var chars = marker[0];
      var repeat = marker[1];
      var uncompressed_chunk = s.substring(j+1,j+chars+1);
      if (recurse) {
        total += uncompressedLength(uncompressed_chunk,recurse)*repeat;
      } else {
        total += chars*repeat;
      }
      i = j + chars + 1;
    } else {
      total++;
      i++;
    }
  }
  return total;
};


var runAdvent09 = function() {
  console.log(uncompressedLength(input,false));
  console.log(uncompressedLength(input,true));
};
