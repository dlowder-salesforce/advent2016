input = [];
    
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./input23-optimized.txt')
});
    
lineReader.on('line', function (line) {
  input.push(line.split(' '));
});
    
lineReader.on('close', function () {
  runAdvent23();
});

// input = [
//   "cpy 2 a",
//   "tgl a",
//   "tgl a",
//   "tgl a",
//   "cpy 1 a",
//    "dec a",
//    "dec a"
// ];

var registers = {'a':0, 'b':0, 'c':0, 'd':0};

var executeInstruction = function(s,i) {
  var v, u;
  var tokens = s;
  if (tokens[0] === 'cpy') {
    v = parseInt(tokens[1]);
    u = parseInt(tokens[2]);
    if (!isNaN(u)) {
      // invalid instruction
      return i + 1;
    }
    if (!isNaN(v)) {
      registers[tokens[2]] = v;
    } else {
      registers[tokens[2]] = registers[tokens[1]];
    }
    return i + 1;
  }
  if (tokens[0] === 'add') {
    if (tokens.length > 3) {
      registers[tokens[1]] += registers[tokens[2]]*registers[tokens[3]];
      registers[tokens[2]] = 0;
      registers[tokens[3]] = 0;
    } else {
      registers[tokens[1]] += registers[tokens[2]];
      registers[tokens[2]] = 0;
    }
    return i + 1;
  }
  if (tokens[0] === 'nop') {
    return i + 1;
  }
  if (tokens[0] === 'inc') {
    registers[tokens[1]]++;
    return i + 1;
  }
  if (tokens[0] === 'dec') {
    registers[tokens[1]]--;
    return i + 1;
  }
  if (tokens[0] === 'jnz') {
    v = parseInt(tokens[1]);
    if (isNaN(v)) {
      v = registers[tokens[1]];
    }
    u = parseInt(tokens[2]);
    if (isNaN(u)) {
      u = registers[tokens[2]];
    }
    if (v === 0) {
      return i + 1;
    } else {
      return i + u;
    }
  }
  if (tokens[0] === 'tgl') {
    v = parseInt(tokens[1]);
    if (isNaN(v)) {
      v = registers[tokens[1]];
    }
    v = v + i;
    if (v < 0 || v >= input.length) {
      return i + 1;
    }
    tokens = input[v];
    if (tokens[0] === 'inc') {
      tokens[0] = 'dec';
    }
    else if (tokens[0] === 'dec') {
      tokens[0] = 'inc';
    }
    else if (tokens[0] === 'tgl') {
      tokens[0] = 'inc';
    }
    else if (tokens[0] === 'jnz') {
      tokens[0] = 'cpy';
    }
    else if (tokens[0] === 'cpy') {
      tokens[0] = 'jnz';
    }
    return i + 1;
  }

};
var runAdvent23 = function() {
  var n = 0;
  registers.a = 12;
  while (n < input.length) {
    n = executeInstruction(input[n],n);
  }
  console.log(registers);
};

