var page = (function() {
  var playerConverter = {player1: "player2", player2: "player1", unbeatable: "player1"};

  var updatePlayerConverter = function() {
    playerConverter.player1 = opponent;
  };

  var checkMove = function(wordSoFar, player) {
    updatePlayerConverter();
    var switchPlayer = playerConverter[player];

    Trie.search(wordSoFar.toLowerCase(), function(result) {
      if(result.answer == true || result.answer == false) {
        winPage(switchPlayer, wordSoFar, result.answer);
      } else if(switchPlayer == "player2") {
        // pass current node to player2
        player2.moveHandler(result.answer);
      } else if(switchPlayer == "unbeatable") {
        // pass current node to unbeatable player2
        unbeatable.moveHandler(result.answer);
      } else if(switchPlayer=="player1") {
        // turn keypress listener back on
        letterListener();
      }
    });
  };

  var winPage = function(winner, wordSoFar, result) {
    $("#message-header").children().remove();
    if(winner === "player1") {
      $("#message-header").append("<h2>Game Over! You won!</h2>");
    } else {
      $("#message-header").append("<h2>Game Over! You lost.</h2>");
    }
    if(result == true){
      // If word has been finished, game is over
      $("#message-header").append("<h3>" + wordSoFar + " is a word.</h3>");
    } else if(result == false) {
      // If word is no longer possible, game is over
      $("#message-header").append("<h3>" + wordSoFar +  " is no longer moving towards a word in our dictionary");
    }
  };

  var appendLetter = function(newLetter, player) {
    var currentString = $("#ghost-val").text();
    var wordSoFar = currentString + newLetter.toUpperCase();
    $("#ghost-val").text(wordSoFar);

    checkMove(wordSoFar, player);
  };

  return {
    appendLetter: appendLetter
  }
})();