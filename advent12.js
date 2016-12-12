var input = [
  "cpy 41 a",
  "inc a",
  "inc a",
  "dec a",
  "jnz a 2",
  "dec a"
];

input = [
  "cpy 1 a",
  "cpy 1 b",
  "cpy 26 d",
  "jnz c 2",
  "jnz 1 5",
  "cpy 7 c",
  "inc d",
  "dec c",
  "jnz c -2",
  "cpy a c",
  "inc a",
  "dec b",
  "jnz b -2",
  "cpy c b",
  "dec d",
  "jnz d -6",
  "cpy 17 c",
  "cpy 18 d",
  "inc a",
  "dec d",
  "jnz d -2",
  "dec c",
  "jnz c -5"
];

var registers = {'a':0, 'b':0, 'c':1, 'd':0};

var executeInstruction = function(s,i) {
  var tokens = s.split(' ');
  if (tokens[0] === 'cpy') {
    var v = parseInt(tokens[1]);
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
    var v = parseInt(tokens[1]);
    if (isNaN(v)) {
      v = registers[tokens[1]];
    }
    if (v === 0) {
      return i + 1;
    } else {
      return i + parseInt(tokens[2]);
    }
  }
};


var runAdvent12 = function() {
  var n = 0;
  while (n < input.length) {
    n = executeInstruction(input[n],n);
    //console.log('n: ' + n + '; registers = ' + registers.a + ' ' + registers.b + ' ' + registers.c + ' ' + registers.d);
  }
  console.log(registers);
};

runAdvent12();
