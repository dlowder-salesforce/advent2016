/**
 * test input
 *
The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.
 */

/**
 * real input
The first floor contains a thulium generator, a thulium-compatible microchip, a plutonium generator, and a strontium generator.
The second floor contains a plutonium-compatible microchip and a strontium-compatible microchip.
The third floor contains a promethium generator, a promethium-compatible microchip, a ruthenium generator, and a ruthenium-compatible microchip.
The fourth floor contains nothing relevant.
 */

const Heap = require('heap');
const Combinatorics = require('js-combinatorics');

Array.prototype.sortByNumber = function() {
  return this.sort(function(a,b) {return b<a;});
};

var thulium = 1,
    plutonium = 2,
    strontium = 3,
    promethium = 4,
    ruthenium = 5,
    hydrogen = 6,
    lithium = 7;

var initialState = [
  [thulium, -thulium, plutonium, strontium].sortByNumber(),
  [-plutonium, -strontium].sortByNumber(),
  [promethium, -promethium, ruthenium, -ruthenium].sortByNumber(),
  []
];

console.log(initialState);

/**

def correct(floor):
    if not floor or floor[-1] < 0: # no generators
        return True
    return all(-chip in floor for chip in floor if chip < 0)

frontier = []
heapq.heappush(frontier, (0, initial))
cost_so_far = {initial: 0}

while frontier:
    _, current = heapq.heappop(frontier)
    floor, floors = current
    if floor == 3 and all(len(f) == 0 for f in floors[:-1]): # goal!
        break

    directions = [dir for dir in (-1, 1) if 0 <= floor + dir < 4]
    moves = list(combinations(floors[floor], 2)) + list(combinations(floors[floor], 1))
    for move in moves:
        for direction in directions:
            new_floors = list(floors)
            new_floors[floor] = tuple(x for x in floors[floor] if x not in move)
            new_floors[floor+direction] = tuple(sorted(floors[floor+direction] + move))

            if not correct(new_floors[floor]) or not correct(new_floors[floor+direction]):
                continue

            next = (floor+direction, tuple(new_floors))
            new_cost = cost_so_far[current] + 1
            if next not in cost_so_far or new_cost < cost_so_far[next]:
                cost_so_far[next] = new_cost
                priority = new_cost - len(new_floors[3])*10 # silly manually tweakable heuristic factor
                heapq.heappush(frontier, (priority, next))

print(cost_so_far[current], current)

 */
