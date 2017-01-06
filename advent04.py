import sys, os
import re

pathname = os.path.dirname(sys.argv[0])
f = open(pathname + '/input04.txt','r')

input = f.read().strip().split('\n')

def parse(room):
    regex = re.compile("(?P<name>[-a-z]*)-(?P<id>[0-9]*)\[(?P<checksum>.*)\]")
    result = regex.search(room)
    if result == None:
        return ("", "", "")
    return (result.group("name"), result.group("id"), result.group("checksum"))

letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

def frequencyMap(s):
    m = {}
    for i in range(len(letters)):
        m[letters[i]] = s.count(letters[i])
    output = ""
    for i in range(len(s), 0, -1):
        for j in range(len(letters)):
            if m[letters[j]] == i:
                output += letters[j]
    return output

def convertLetter(l, n):
    i = letters.index(l)
    if i == -1:
        return '.'
    j = (i + n) % 26
    return letters[j]

def decrypt(s, n):
    output = ""
    for i in range(len(s)):
        if s[i] == '-':
            output += " "
        else:
            output += convertLetter(s[i],n)
    return output

sectorIDSum = 0;

for i in range(len(input)):
    (name, sectorID, checksum) = parse(input[i])
    if frequencyMap(name).find(checksum) == 0:
        sectorIDSum += int(sectorID)
        decrypted = decrypt(name, int(sectorID))
        if decrypted.find("north") != -1:
            print(decrypted + ":" + sectorID)

print(sectorIDSum)
