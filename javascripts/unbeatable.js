var unbeatable = (function() {
  var checkForMove = function(node, options) {
    options = options || [];

    if(node.children) {
      var subletters = Object.keys(node.children);
      subletters.forEach(function(letterKey) {
        var child = node.children[letterKey];
        if(!child.isWord) {
          options.push(child);
        }
      });
    }
    return options;
  };

  var pickMove = function(node) {
    var moves = checkForMove(node);
    var bestMoves = [];

    if(moves.length){
      var tempMoves = makeBestMove(moves);
    } 

    if(!moves.length || !tempMoves.length) {
      moves = makeLosingMove(node);
    } else {
      moves = tempMoves;
    }

    var moveInd = Math.floor(Math.random() * moves.length);
    return moves[moveInd];
  }

  var makeBestMove = function(moves) {
    var bestMoves = [];
    // moves are the computer's options. Make an unbeatable move.
    moves.forEach(function(move) {
      if(searchOptions(move, false)) {
        bestMoves.push(move.value);
      };
    });

    return bestMoves;
  };

  var makeLosingMove = function(node) {
    return Object.keys(node.children);
  };

  var searchOptions = function(move, compTurn) {

    // when compTurn is true, we're iterating over the computer's options
    var isGoodMove = true;
    for(var letter in move.children) {
      var child = move.children[letter];
      if(compTurn && child.isWord) {
        // If it's the computer's turn and the move ends a word,
        // we want false to bubble up so that it is no longer a viable option
        isGoodMove = false;
      } else if(!child.isWord) {
        isGoodMove = searchOptions(child, !compTurn);
      }
    }
    return isGoodMove;
  };

  var moveHandler = function(node) {
    var move = pickMove(node);
    page.appendLetter(move, "player2");
  };

  return {
    moveHandler: moveHandler
  }

})();


// {a: false, b: {a: {t: false}, i: false, y: false}}
// Traverse back up the tree. If the only key option has value false,
// then that key option is also false. 