import sys, os
import re
import itertools

pathname = os.path.dirname(sys.argv[0])
f = open(pathname + '/input11.txt','r')

input = f.read().strip().split('\n')

input = [
"The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.",\
"The second floor contains a hydrogen generator.",\
"The third floor contains a lithium generator.",\
"The fourth floor contains nothing relevant."\
]

regex_floors = [\
re.compile("The (first) floor"),\
re.compile("The (second) floor"),\
re.compile("The (third) floor"),\
re.compile("The (fourth) floor")\
]

regex_item= re.compile(" ([a-z]*)( generator|-compatible)")

def copy_floors(floors):
    f_new = []
    for f in floors:
        g = []
        for o in f:
            g.append(o)
        f_new.append(sorted(g))
    return f_new

def parse_input(l):
    floors = []
    chip_types = {}
    current_type = 1
    for i in range(len(regex_floors)):
        for s in l:
            if regex_floors[i].search(s) != None:
                floors.append([])
                for match in regex_item.finditer(s):
                    element_name = match.group(1)
                    if element_name not in chip_types.keys():
                        chip_types[element_name] = current_type
                        current_type += 1
                    if match.group(2) == " generator":
                        floors[i].append(chip_types[element_name])
                    else:
                        floors[i].append(-chip_types[element_name])
    for i in range(len(floors)):
        floors[i] = sorted(floors[i])
    return (floors, chip_types)




(floors, chip_types) = parse_input(input)

elevator = 0

def floor_ok(f):
    for k in f:
        if k < 0:
            if -k not in f:
                for l in chip_types.values():
                    if l in f and l > 0 and l != -k:
                        return False
    return True

def next_states(state):
    (elevator, floors) = state
    current_floor = floors[elevator]

    new_floors = []
    if elevator < 3:
        new_floors.append(elevator+1)
    if elevator > 0:
        new_floors.append(elevator-1)

    states = []
    for f in new_floors:
        for i in range(len(current_floor)):
            for l in itertools.combinations(current_floor,i+1):
                for item in l:
                    index = floors[elevator].index(item)
                    del floors[elevator][index]
                    floors[f].append(item)
                if floor_ok(floors[f]) and floor_ok(floors[elevator]):
                    states.append( (f, copy_floors(floors)) )
                for item in l:
                    index = floors[f].index(item)
                    del floors[f][index]
                    floors[elevator].append(item)
                floors[elevator] = sorted(floors[elevator])

    return states

def done(state):
    (elevator, floors) = state
    return (elevator == 3 and len(floors[0]) == 0 and len(floors[1]) == 0 and len(floors[2]) == 0)

def equals(state1, state2):
    (e1, f1) = state1
    (e2, f2) = state2
    if e1 != e2:
        return False
    for i in range(len(f1)):
        if f1[i] != f2[i]:
            return False
    return True


def dfs(steps, state, visited):
    if done(state):
        print(steps)
    visited.append(state)
    for s in next_states(state):
        found = False
        for s1 in visited:
            if equals(s,s1):
                found = True
        if not found:
            dfs(steps + 1, s, visited)

(floors, chip_types) = parse_input(input)

elevator = 0

initial_state = (elevator, floors)

dfs(0, initial_state, [])
