    var input = [];
    
    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('./input08.txt')
    });
    
    lineReader.on('line', function (line) {
      input.push(line);
    });
    
    lineReader.on('close', function () {
      runAdvent08();
    });
    
    var width = 50;
    var height = 6;
    
    Array.prototype.rotate = function( n ) {
      n = this.length - n % this.length;
      this.unshift.apply( this, this.splice( n, this.length ) )
      return this;
    };
    
    var makeArray = function(width, height) {
      var a = [];
      for (var i=0; i<width; i++) {
        var b = [];
        for (var j=0; j<height; j++) {
          b.push('.');
        }
        a.push(b.slice());
      }
      return a;
    };
    
    var printArray = function(a) {
      var w = a.length;
      var h = a[0].length;
      for (var i=0; i<h; i++) {
        var s = "";
        for (var j=0; j<w; j++) {
          s = s + a[j][i];
        }
        console.log(s);
      }
      console.log("");
    };
    
    var countLightedPixels = function(a) {
      var count = 0;
      for (var i=0; i<a.length; i++) {
        for (var j=0; j<a[0].length; j++) {
          if(a[i][j] === '#') {
            count++;
          }
        }
      }
      return count;
    }
    
    var rotateRow = function(a,y,n) {
      var b = [];
      for (var i=0; i<a.length; i++) {
        b.push(a[i][y]);
      }
      b.rotate(n);
      for (i=0; i<a.length; i++) {
        a[i][y] = b[i];
      }
    };
    
    var rotateColumn = function(a,x,n) {
      a[x].rotate(n);
    };
    
    var setRect = function(a,x,y) {
      for (var i=0; i<x; i++) {
        for (var j=0; j<y; j++) {
          a[i][j] = '#';
        }
      }
    }
    
    var executeInstruction = function(a,s) {
      var tokens = s.split(' ');
      if(tokens[0] === 'rect') {
        var xy = tokens[1].split('x');
        var x = parseInt(xy[0]);
        var y = parseInt(xy[1]);
        setRect(a,x,y);
      } else if(tokens[0] === 'rotate') {
        if(tokens[1] === 'row') {
          y = parseInt(tokens[2].split('=')[1])
          var n = parseInt(tokens[4]);
          rotateRow(a,y,n);
        } else if(tokens[1] === 'column') {
          x = parseInt(tokens[2].split('=')[1])
          var n = parseInt(tokens[4]);
          rotateColumn(a,x,n);
        }
      }
    };
    
    
    // Uncomment this to test the example from the instructions
    /*
    width = 7;
    height = 3;
    input = [
      'rect 3x2',
      'rotate column x=1 by 1',
      'rotate row y=0 by 4',
      'rotate column x=1 by 1'
    ];
     */
    
    var runAdvent08 = function() {
      var board = makeArray(width,height);
      
      for (var i=0; i<input.length; i++) {
        executeInstruction(board,input[i]);
      }
    
      console.log("Part 1 answer:");
      console.log(countLightedPixels(board));
      console.log("");
      console.log("Part 2 answer:");
      printArray(board);
    };
