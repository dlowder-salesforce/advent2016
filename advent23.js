var input = [
  "cpy a b",
  "dec b",
  "cpy a d",
  "cpy 0 a",
  "cpy b c",
  "inc a",
  "dec c",
  "jnz c -2",
  "dec d",
  "jnz d -5",
  "dec b",
  "cpy b c",
  "cpy c d",
  "dec d",
  "inc c",
  "jnz d -2",
  "tgl c",
  "cpy -16 c",
  "jnz 1 c",
  "cpy 83 c",
  "jnz 78 d",
  "inc a",
  "inc d",
  "jnz d -2",
  "inc c",
  "jnz c -5"
];

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
  var tokens = s.split(' ');
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
      if (tokens[1] === '1') {
        debugger;
      }
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
    var instructionToChange = input[v];
    tokens = instructionToChange.split(" ");
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
    input[v] = tokens.join(' ');
    return i + 1;
  }

};
var runAdvent23 = function() {
  var n = 0;
  registers.a = 4;
  while (n < input.length) {
    //console.log(input[n]);
    n = executeInstruction(input[n],n);
    //console.log('n: ' + n + '; registers = ' + registers.a + ' ' + registers.b + ' ' + registers.c + ' ' + registers.d);
  }
  console.log(registers);
};

runAdvent23();
