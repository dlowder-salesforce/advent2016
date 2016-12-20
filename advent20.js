    var input = [];
    
    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('./input20.txt')
    });
    
    lineReader.on('line', function (line) {
      input.push(line);
    });
    
    lineReader.on('close', function () {
      runAdvent20();
    });

    var compareIntervals = function(i1, i2) {
      return (i1[0] < i2[0] ? -1 : 1);
    };

    var mergeIntervals = function(intervals) {
      if(intervals.length <= 1) {
        return intervals;
      }
      intervals.sort(compareIntervals);
      var result = [];
      var first = intervals[0];
      var start = first[0];
      var end = first[1];
      var i=1;
      while(i < intervals.length) {
        var current = intervals[i];
        if (current[0] <= end) {
          end = Math.max(current[1], end);
        } else {
          result.push([start, end]);
          start = current[0];
          end = current[1];
        }
        i++;
      }
      result.push([start, end]);
      return result;
    }; 

    var runAdvent20 = function() {
      var intervals = [];
      for (var i=0; i<input.length; i++) {
        var tokens = input[i].split('-');
        intervals.push([parseInt(tokens[0]), parseInt(tokens[1])]);
      }
      var merged = mergeIntervals(intervals);

      // Part 1
      for (i=0; i<merged.length-1; i++) {
        if (merged[i][1]+1 < merged[i+1][0]) {
          console.log(merged[i][1] + 1);
          break;
        }
      }

      // Part 2
      var allowed_ips = 0;
      if(merged[0][0] > 1) {
        allowed_ips += merged[0][0] - 1;
      }
      for (i=0; i<merged.length-1; i++) {
        allowed_ips += merged[i+1][0] - merged[i][1] - 1;
      }
      if (merged[merged.length-1][1] < 4294967295) {
        allowed_ips += 4294967295 - merged[merged.length-1][1] - 1;
      }
      console.log(allowed_ips);
      
    }
    
