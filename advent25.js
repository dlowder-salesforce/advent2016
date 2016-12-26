var input = [
  "cpy a d",
  "cpy 7 c",
  "cpy 362 b",
  "add d b c",
  "nop",
  "nop",
  "nop",
  "nop",
  "cpy d a",
  "jnz 0 0",
  "cpy a b",
  "cpy 0 a",
  "cpy 2 c",
  "jnz b 2",
  "jnz 1 6",
  "dec b",
  "dec c",
  "jnz c -4",
  "inc a",
  "jnz 1 -7",
  "cpy 2 b",
  "jnz c 2",
  "jnz 1 4",
  "dec b",
  "dec c",
  "jnz 1 -4",
  "jnz 0 0",
  "out b",
  "jnz a -19",
  "jnz 1 -21"
];

for (var i=0; i<input.length; i++) {
  input[i] = input[i].split(" ");
};

var registers = {'a':0, 'b':0, 'c':0, 'd':0};

var outputstring = "";

var executeInstruction = function(s,i) {
  var v, u;
  var tokens = s;
  if (tokens[0] === 'out') {
    outputstring = outputstring + registers[tokens[1]];
    return i+1;
  }
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

i = 0;
while (true) {
  i += 1;
  registers.a = i;
  registers.b = 0;
  registers.c = 0;
  registers.d = 0;
  console.log('a = ' + i);
  var n = 0;
  while (n < input.length) {
    n = executeInstruction(input[n],n);
    if (n === input.length - 1) {
      console.log(outputstring);
      if (outputstring === "101010101010") {
        exit(0);
      }
      if (outputstring === "010101010101") {
        exit(0);
      }
      outputstring="";
      break;
    }
  }
};

