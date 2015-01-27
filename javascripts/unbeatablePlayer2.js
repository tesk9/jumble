var unbeatableplayer2 = (function() {
  var path = {};

  var checkForMove = function(node) {
    if(node.children) {
      var subletters = Object.keys(node.children);
      subletters.forEach(function(letterKey, ind) {
        var child = node.children[letterKey];
        if(!child.isWord) {
          path[ind] = letterKey;
          getsubWordLengths(child, ind)
        }
      });
    }
    var options = [];
    for(var key in path) {
      options.push(path[key])
    }
    return options;
  };

  var getsubWordLengths = function(head, pathInd, lev) {
    lev = lev || 0;
    var subletters = Object.keys(head.children);
    if(subletters) {
      subletters.forEach(function(letterKey) {
        var child = head.children[letterKey];
        if(child.isWord && lev % 2 ) {
          delete path[pathInd];
        } else {
          getsubWordLengths(child, pathInd, lev+1)
        }
      });   
    }
  }

  var makeLosingMove = function(node) {
    return Object.keys(node.children);
  }

  var makeBestMove = function(node) {
    var moves = checkForMove(node);
    if(moves.length == 0){
      moves = makeLosingMove(node);
    }
    var moveInd = Math.floor(Math.random() * moves.length);
    return moves[moveInd];
  };

  var moveHandler = function(node) {
    var move = makeBestMove(node);
    page.appendLetter(move, "player2");
  };

  return {
    moveHandler: moveHandler
  }

})();