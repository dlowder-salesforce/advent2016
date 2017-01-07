import sys, os
import re

pathname = os.path.dirname(sys.argv[0])
f = open(pathname + '/input08.txt','r')

input = f.read().strip().split('\n')

width = 50
height = 6

def rotate(s, n):
    n = len(s) - n % len(s)
    return s[n:] + s[:n]

def makeArray(w, h):
    a = []
    for i in range(w):
        b = []
        for j in range(h):
            b.append('.')
        a.append(b)
    return a

def printArray(a):
    for i in range(len(a[0])):
        s = ""
        for j in range(len(a)):
            s += a[j][i]
        print(s)

def countLightedPixels(a):
    count = 0
    for i in range(len(a)):
        count += a[i].count('#')
    return count

def rotateRow(a, y, n):
    b = []
    for i in range(len(a)):
        b.append(a[i][y])
    b = rotate(b, n)
    for i in range(len(a)):
        a[i][y] = b[i]

def rotateColumn(a, x, n):
    a[x] = rotate(a[x], n)

def setRect(a, x, y):
    for i in range(x):
        for j in range(y):
            a[i][j] = '#'

def executeInstruction(a, s):
    tokens = s.split()
    if tokens[0] == 'rect':
        (x, y) = map(int, tokens[1].split('x'))
        setRect(a, x, y)
    elif tokens[0] == 'rotate':
        if tokens[1] == 'column':
            x = int(tokens[2].split('=')[1])
            n = int(tokens[4])
            rotateColumn(a, x, n)
        elif tokens[1] == 'row':
            y = int(tokens[2].split('=')[1])
            n = int(tokens[4])
            rotateRow(a, y, n)

board = makeArray(width, height)

for i in range(len(input)):
    executeInstruction(board, input[i])

print("Part 1: ")
print(countLightedPixels(board))

print("Part 2: ")
printArray(board)
