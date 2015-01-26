var player2 = (function() {
  var checkForMove = function(node, options) {
    options = options || [];
    if(node.children) {
      var subletters = Object.keys(node.children);
      subletters.forEach(function(letterKey) {
        var child = node.children[letterKey];
        if(!child.isWord) {
          options.push(letterKey);
        }
      });
    }
    return options;
  };

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