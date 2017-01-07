import sys, os
import re
from hashlib import md5


def my_md5(s):
    return md5(s).hexdigest()

pathname = os.path.dirname(sys.argv[0])
f = open(pathname + '/input05.txt','r')

input = f.read().strip()

output1 = ['x','x','x','x','x','x','x','x']
output2 = ['x','x','x','x','x','x','x','x']

i = 0
n = 0

while 'x' in output2:
    checksum = my_md5(input + str(i))
    if checksum.find('00000') == 0:
        if n < 8:
            output1[n] = checksum[5]
            n += 1
        loc = int(checksum[5],16)
        c = checksum[6]
        if loc >= 0 and loc < 8 and output2[loc] == 'x':
            output2[loc] = c
        #print i

    i += 1

print "".join(output1)
print "".join(output2)

