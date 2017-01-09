import sys, os
import re

pathname = os.path.dirname(sys.argv[0])
f = open(pathname + '/input09.txt','r')

input = list(f.read().strip())

def uncompressed_length(s, recurse):
    total = 0
    i = 0
    while i < len(s):
        if s[i] == '(':
            j = s.index(')',i)
            (chars, repeat) = map(int, ''.join(s[i+1:j]).split('x'))
            uncompressed_chunk = s[j+1:j+chars+1]
            if recurse:
                total += uncompressed_length(uncompressed_chunk, recurse)*repeat
            else:
                total += chars*repeat
            i = j + chars + 1
        else:
            total += 1
            i += 1
    return total

print(uncompressed_length(input,False))
print(uncompressed_length(input,True))
