import sys, os

pathname = os.path.dirname(sys.argv[0])
f = open(pathname + '/input02.txt','r')

input = f.read().strip().split('\n')


# 1 2 3
# 4 5 6
# 7 8 9

keymap_part1 = { '02':'1', '12':'2', '22':'3', '01':'4', '11':'5', '21':'6', '00':'7', '10':'8', '20':'9' }

startposition_part1 = [1,1]

#     1
#   2 3 4
# 5 6 7 8 9
#   A B C
#     D


keymap_part2 = { '24': '1', '13': '2', '23': '3', '33': '4', '02': '5', '12': '6', '22': '7', '32': '8', '42': '9', '11': 'A', '21': 'B', '31': 'C', '20': 'D' }

startposition_part2 = [0,2]

def key_from_position(position):
  return "" + str(position[0]) + str(position[1])

def solve(start, keymap, input):
    position = start
    keys = keymap.keys()
    solution = ""
    for i in range(len(input)):
        for j in range(len(input[i])):
            c = input[i][j:j+1]
            if c == 'R':
                position[0] += 1
                if key_from_position(position) not in keys:
                    position[0] -= 1
            elif c == 'L':
                position[0] -= 1;
                if key_from_position(position) not in keys:
                    position[0] += 1
            elif c == 'U':
                position[1] += 1;
                if key_from_position(position) not in keys:
                    position[1] -= 1
            elif c == 'D':
                position[1] -= 1;
                if key_from_position(position) not in keys:
                    position[1] += 1
        solution = solution + keymap[key_from_position(position)]
    print(solution)

solve(startposition_part1, keymap_part1, input)
solve(startposition_part2, keymap_part2, input)
