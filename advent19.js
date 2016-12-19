
var genStartState = function(n) {
  var state = {};
  state['index'] = 0;
  var elves = [];
  for (var i=0; i<n; i++) {
    elves.push({"id":(i+1),"presents":1});
  }
  state['elves'] = elves;
  return state;
};



var iterateOnce = function(state) {
  var i = state.index;
  if (state.elves[i].presents === 0) {
    state.elves.splice(i,1);
    if (i >= state.elves.length) {
      state.index = 0;
    }
    return;
  }
  var next_i = (i + 1) % state.elves.length;
  var across_i = (i + Math.floor(state.elves.length/2)) % state.elves.length;
  state.elves[i].presents += state.elves[across_i].presents;
  state.elves[across_i].presents = 0;
  state.index = next_i;
};

var n = 3018458;
var state = genStartState(n);
while(state.elves.length > 1) {
  iterateOnce(state);
  if (state.elves.length < n - 1000) {
    debugger;
    console.log(state.elves.length);
    n -= 1000;
  }
}
console.log("" + n + " " + state.elves[0].id);
