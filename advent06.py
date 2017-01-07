import sys, os
import re

pathname = os.path.dirname(sys.argv[0])
f = open(pathname + '/input06.txt','r')

input = f.read().strip().split('\n')

letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

def frequencyMap(s):
    m = {}
    for i in range(len(letters)):
        m[letters[i]] = s.count(letters[i])

    output = ""
    for i in range(len(s),0,-1):
        for j in range(len(letters)):
            if m[letters[j]] == i:
                output += letters[j]

    return output

def mostFrequentChar(s):
    return frequencyMap(s)[0]

def leastFrequentChar(s):
    return frequencyMap(s)[-1]

messageLength = len(input[0])

messageChars = [""]*messageLength

for i in range(len(input)):
    for j in range(messageLength):
        messageChars[j] = messageChars[j] + input[i][j]


output = ""
for i in range(messageLength):
    output += mostFrequentChar(messageChars[i])

print(output)

output = ""
for i in range(messageLength):
    output += leastFrequentChar(messageChars[i])

print(output)

