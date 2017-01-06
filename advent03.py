import sys, os

pathname = os.path.dirname(sys.argv[0])
f = open(pathname + '/input03.txt','r')

input1 = f.read().strip().split('\n')

for i in range(len(input1)):
    input1[i] = input1[i].strip().split()
    for j in range(len(input1[i])):
        input1[i][j] = int(input1[i][j])

input2 = []
j = 0
while j < len(input1):
    input2.append([input1[j][0], input1[j+1][0], input1[j+2][0]])
    input2.append([input1[j][1], input1[j+1][1], input1[j+2][1]])
    input2.append([input1[j][2], input1[j+1][2], input1[j+2][2]])
    j += 3


def countGoodTriangles(triangles):
    goodtriangles = 0
    for i in range(len(triangles)):
        if triangles[i][0] + triangles[i][1] <= triangles[i][2]:
            continue
        if triangles[i][1] + triangles[i][2] <= triangles[i][0]:
            continue
        if triangles[i][2] + triangles[i][0] <= triangles[i][1]:
            continue
        goodtriangles += 1
    return goodtriangles

print(countGoodTriangles(input1));

print(countGoodTriangles(input2));
