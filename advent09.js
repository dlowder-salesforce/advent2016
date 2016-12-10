/*
ADVENT contains no markers and decompresses to itself with no changes, resulting in a decompressed length of 6.
A(1x5)BC repeats only the B a total of 5 times, becoming ABBBBBC for a decompressed length of 7.
(3x3)XYZ becomes XYZXYZXYZ for a decompressed length of 9.
A(2x2)BCD(2x2)EFG doubles the BC and EF, becoming ABCBCDEFEFG for a decompressed length of 11.
(6x1)(1x3)A simply becomes (1x3)A - the (1x3) looks like a marker, but because it's within a data section of another marker, it is not treated any differently from the A that comes after it. It has a decompressed length of 6.
X(8x2)(3x3)ABCY becomes X(3x3)ABC(3x3)ABCY (for a decompressed length of 18), because the decompressed data from the (8x2) marker (the (3x3)ABC) is skipped and not processed further.
 */

    var input = [];
   
    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('./input09.txt')
    });
   
    lineReader.on('line', function (line) {
      input.push(line);
    });
   
    lineReader.on('close', function () {
      runAdvent09();
    });

var testInput = [
  'ADVENT',
  'A(1x5)BC',
  '(3x3)XYZ',
  'A(2x2)BCD(2x2)EFG',
  '(6x1)(1x3)A',
  'X(8x2)(3x3)ABCY',
];

var parsedMarker = function(s) {
  var a = s.split('x');
  if (a && a.length === 2) {
    var a0 = parseInt(a[0]);
    var a1 = parseInt(a[1]);
    if (a0 && a0 !== NaN && a1 && a1 !== NaN) {
      return [a0,a1];
    }
  }
  return null;
};

var firstMarkerAndUncompressed = function(s) {
  var i = s.indexOf('(');
  if (i === -1) {
    return null;
  }
  var j = s.substring(i+1,s.length).indexOf(')');
  if (j === -1) {
    return null;
  }
  var markerString = s.substring(i+1,i+j+1);
  var marker = parsedMarker(markerString);
  if (marker) {
    var stringToRepeat = s.substring(i+j+2,i+j+marker[0]+2);
    var compressedMarkerAndString = s.substring(i,i+j+marker[0]+2);
    var remaining = s.substring(i+j+marker[0]+2,s.length);
    var uncompressed = "";
    var header = s.substring(0,i);
    if (stringToRepeat.indexOf('(') !== -1) {
      for (var k=0; k<marker[1]; k++) {
        uncompressed = uncompressed + stringToRepeat;
      }
      return [header,uncompressed,remaining];
    } else {
      return [header,null,remaining,marker[1]*stringToRepeat.length];
    }
  } else {
    return null;
  }
};

var decompressedLengthOnePass = function(s) {
  var a = firstMarkerAndUncompressed(s);
  if(a) {
    var header = a[0];
    var uncompressed = a[1];
    var remaining = a[2];
    var ul = (uncompressed ? uncompressed.length : a[3]);
    return header.length + ul + decompressedLengthOnePass(remaining);
  } else {
    return s.length;
  }
};

var decompressedLengthMultiplePass = function(s) {
  var a = firstMarkerAndUncompressed(s);
  if(a) {
    var header = a[0];
    var uncompressed = a[1];
    var remaining = a[2];
    var lengthu = (uncompressed ? decompressedLengthMultiplePass(uncompressed) : a[3]);
    var lengthr = decompressedLengthMultiplePass(remaining);
    return header.length + lengthu + lengthr;
  } else {
    return s.length;
  }
};

var runAdvent09 = function() {
  var charCount = 0;
  var charCount2 = 0;
  for (var i=0; i<input.length; i++) {
    debugger;
    charCount += decompressedLengthOnePass(input[i]);
    charCount2 += decompressedLengthMultiplePass(input[i]);
  console.log(charCount);
  console.log(charCount2);
  }
};

