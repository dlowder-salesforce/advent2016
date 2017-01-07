import sys, os
import re

pathname = os.path.dirname(sys.argv[0])
f = open(pathname + '/input07.txt','r')

input = f.read().strip().split('\n')

def tokenize(s):
    i = s.find('[')
    if i == -1:
        d = [] 
        d.append([s])
        d.append([])
        return d
    j = s.find(']')
    d = tokenize(s[j+1:])
    d[0].append(s[:i])
    d[1].append(s[i+1:j])
    return d

def contains_abba(s):
    if len(s) < 4:
        return False
    for i in range(len(s) - 3):
        if s[i] != s[i+1] and s[i] == s[i+3] and s[i+1] == s[i+2]:
            return True
    return False

def aba_strings(s, bracketed):
    strings = []
    if len(s) > 3:
        for i in range(len(s)-2):
            if s[i] != s[i+1] and s[i] == s[i+2]:
                if bracketed:
                    strings.append(s[i+1] + s[i])
                else:
                    strings.append(s[i] + s[i+1])
    return strings


      
count = 0
count2 = 0

for i in range(len(input)):
    a = tokenize(input[i])
    supportsTLS = False
    for j in range(len(a[0])):
        if contains_abba(a[0][j]):
            supportsTLS = True
    for j in range(len(a[1])):
        if contains_abba(a[1][j]):
            supportsTLS = False
    if supportsTLS:
        count += 1

    abas = []
    for j in range(len(a[0])):
        abas += aba_strings(a[0][j],False)
    babs = []
    for j in range(len(a[1])):
        babs += aba_strings(a[1][j],True)

    ssl = False
    for j in range(len(abas)):
        for k in range(len(babs)):
            if abas[j] == babs[k]:
                ssl = True

    if ssl:
        count2 += 1

print(count)
print(count2)
