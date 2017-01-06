import sys, os

pathname = os.path.dirname(sys.argv[0])
f = open(pathname + '/input01.txt','r')

steps = f.read().strip().split(', ')

directions = [[0,1],[1,0],[0,-1],[-1,0]]

position = [0,0]
idirection = 0
visitedLocations = [[0,0]]
twiceVisitedFound = False

for i in range(len(steps)):
    turn = steps[i][0:1]
    length = int(steps[i][1:len(steps[i])])
    if turn == 'R':
        idirection += 1
    else:
        idirection -= 1
    if idirection < 0:
        idirection += 4
    if idirection > 3:
        idirection -= 4
    for k in range(length):
        position[0] = position[0] + directions[idirection][0]
        position[1] = position[1] + directions[idirection][1]
        if not twiceVisitedFound:
            for j in range(len(visitedLocations)):
                if visitedLocations[j][0] == position[0] and visitedLocations[j][1] == position[1]:
                    print(abs(position[0]) + abs(position[1]))
                    twiceVisitedFound = True
        visitedLocations.append([position[0],position[1]])

print(abs(position[0]) + abs(position[1]))
