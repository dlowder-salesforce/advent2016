var steps = [
"R1", "R1", "R3", "R1", "R1", "L2", "R5", "L2", "R5", "R1", "R4", "L2", "R3", "L3", "R4", "L5", "R4", "R4", "R1", "L5", "L4", "R5", "R3", "L1", "R4", "R3", "L2", "L1", "R3", "L4", "R3", "L2", "R5", "R190", "R3", "R5", "L5", "L1", "R54", "L3", "L4", "L1", "R4", "R1", "R3", "L1", "L1", "R2", "L2", "R2", "R5", "L3", "R4", "R76", "L3", "R4", "R191", "R5", "R5", "L5", "L4", "L5", "L3", "R1", "R3", "R2", "L2", "L2", "L4", "L5", "L4", "R5", "R4", "R4", "R2", "R3", "R4", "L3", "L2", "R5", "R3", "L2", "L1", "R2", "L3", "R2", "L1", "L1", "R1", "L3", "R5", "L5", "L1", "L2", "R5", "R3", "L3", "R3", "R5", "R2", "R5", "R5", "L5", "L5", "R2", "L3", "L5", "L2", "L1", "R2", "R2", "L2", "R2", "L3", "L2", "R3", "L5", "R4", "L4", "L5", "R3", "L4", "R1", "R3", "R2", "R4", "L2", "L3", "R2", "L5", "R5", "R4", "L2", "R4", "L1", "L3", "L1", "L3", "R1", "R2", "R1", "L5", "R5", "R3", "L3", "L3", "L2", "R4", "R2", "L5", "L1", "L1", "L5", "L4", "L1", "L1", "R1"
];

var directions = [
[0,1],
[1,0],
[0,-1],
[-1,0]
];

var position = [0,0];
var idirection = 0;
var visitedLocations = [[0,0]];
var twiceVisitedFound = false;

for (var i=0; i<steps.length; i++) {
  var turn = steps[i].substring(0,1);
  var length = parseInt(steps[i].substring(1,steps[i].length));
  if (turn === 'R') {
    idirection = idirection + 1;
  } else {
    idirection = idirection - 1;
  }
  if (idirection < 0) {
    idirection += 4;
  } 
  if (idirection > 3) {
    idirection -= 4;
  }
  for (var k=0; k<length; k++) {
    position[0] = position[0] + directions[idirection][0];
    position[1] = position[1] + directions[idirection][1];
    if(!twiceVisitedFound) {
      for (j=0; j<visitedLocations.length; j++) {
        if(visitedLocations[j][0] === position[0] && visitedLocations[j][1] === position[1]) {
          console.log(Math.abs(position[0]) + Math.abs(position[1]));
          twiceVisitedFound = true;
        }
      }
    }
    visitedLocations.push([position[0],position[1]]);
  }
}

console.log(position);
console.log(Math.abs(position[0]) + Math.abs(position[1]));
