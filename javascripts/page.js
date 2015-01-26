var page = (function() {
  var checkMove = function(wordSoFar, player) {
    var switchPlayer = playerConverter[player];
    Trie.search(wordSoFar.toLowerCase(), function(result) {
      // If word has been finished, game is over
      // If word is no longer possible, game is over
      if(result.answer == true || result.answer == false) {
        console.log("game over");
        console.log(switchPlayer + " wins");
      // Else, other player's turn
      } else if(switchPlayer == "player2") {
        // pass current node to player2
        player2.moveHandler(result.answer);
      } else if(switchPlayer=="player1") {
        // turn keypress listener back on
        letterListener();
      }
    });
  }

  var appendLetter = function(newLetter, player) {
    var currentString = $("#ghost-val").text();
    var wordSoFar = currentString + newLetter.toUpperCase();
    $("#ghost-val").text(wordSoFar);

    checkMove(wordSoFar, player);
  }

  var playerConverter = {player1: "player2", player2: "player1"}

  return {
    appendLetter: appendLetter
  }
})();