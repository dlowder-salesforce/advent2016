import sys, os
import re

pathname = os.path.dirname(sys.argv[0])
f = open(pathname + '/input10.txt','r')

input = f.read().strip().split('\n')

input = [
"value 5 goes to bot 2",\
"bot 2 gives low to bot 1 and high to bot 0",\
"value 3 goes to bot 1",\
"bot 1 gives low to output 1 and high to bot 0",\
"bot 0 gives low to output 2 and high to output 0",\
"value 2 goes to bot 2",\
]

regex_value = re.compile("value (\d*) goes to bot (\d*)")
regex_bot = re.compile("bot (\d*) gives low to (bot|output) (\d*) and high to (bot|output) (\d*)")

def processInstruction(s):
    result = regex_value.search(s)
    if result != None:
        print("value")
        print(result.group(1), result.group(2))
    else:
        result = regex_bot.search(s)
        if result != None:
            print("bot")
            print(result.group(1), result.group(2), result.group(3), result.group(4), result.group(5))
        else:
            print("Error")

for s in input:
    processInstruction(s)
