import sys, os
import re

pathname = os.path.dirname(sys.argv[0])
f = open(pathname + '/input10.txt','r')

input = f.read().strip().split('\n')

#input = [
#"value 5 goes to bot 2",\
#"bot 2 gives low to bot 1 and high to bot 0",\
#"value 3 goes to bot 1",\
#"bot 1 gives low to output 1 and high to bot 0",\
#"bot 0 gives low to output 2 and high to output 0",\
#"value 2 goes to bot 2",\
#]

regex_value = re.compile("value (\d*) goes to bot (\d*)")
regex_bot = re.compile("bot (\d*) gives low to (bot|output) (\d*) and high to (bot|output) (\d*)")

bots = {}
outputs = {}
values = []

def pass1():
    for s in input:
        result = regex_value.search(s)
        if result != None:
            value = int(result.group(1))
            bot = result.group(2)
            if bot not in bots:
                bots[bot] = []
            bots[bot].append(value)

def pass2():
    finished = True
    for s in input:
        result = regex_bot.search(s)
        if result != None:
            bot = result.group(1)
            low_dest_type = result.group(2)
            low_dest = result.group(3)
            high_dest_type = result.group(4)
            high_dest = result.group(5)
            if bot in bots and len(bots[bot]) == 2:
                finished = False
                low_value = bots[bot][0] if bots[bot][0] < bots[bot][1] else bots[bot][1]
                high_value = bots[bot][0] if bots[bot][0] >= bots[bot][1] else bots[bot][1]
                if low_value == 17 and high_value == 61:
                    print(bot)
                if low_dest_type == 'output':
                    outputs[low_dest] = low_value
                else:
                    if low_dest not in bots:
                        bots[low_dest] = []
                    bots[low_dest].append(low_value)
                if high_dest_type == 'output':
                    outputs[high_dest] = high_value
                else:
                    if high_dest not in bots:
                        bots[high_dest] = []
                    bots[high_dest].append(high_value)
                bots[bot] = []
    return finished

finished = False
pass1()
while not finished:
    finished = pass2()

print(outputs['0']*outputs['1']*outputs['2'])
