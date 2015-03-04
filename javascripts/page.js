var page = (function() {
  var playerConverter;
  var checkMove = function(wordSoFar, player) {
    var switchPlayer = playerConverter[player];

    Trie.search(wordSoFar.toLowerCase(), function(result) {
      if(result.answer == true || result.answer == false) {
        winPage(switchPlayer, wordSoFar, result.answer);
      } else if(switchPlayer == "player2") {
        // pass current node to player2
        player2.moveHandler(result.answer);
      } else if(switchPlayer == "unbeatable") {
        console.log("unbeatable, your turn is over");
        // pass current node to unbeatable player2
        unbeatable.moveHandler(result.answer);
      } else if(switchPlayer=="player1") {
        // turn keypress listener back on
        letterListener();
      }
    });
  }

  var winPage = function(winner, wordSoFar, result) {
    $("#message-header").append("<h2>Game Over! " + winner + " wins</h2>");
    if(result == true){
      // If word has been finished, game is over
      $("#message-header").append("<h3>" + wordSoFar + " is a word.</h3>");
    } else if(result == false) {
      // If word is no longer possible, game is over
      $("#message-header").append("<h3>" + wordSoFar +  " is no longer moving towards a word in our dictionary");
    }
    $("#message-header").append("<p>Click the JUmBLe header to reset.</p>");
  }

  var appendLetter = function(newLetter, player, playerConv) {
    playerConverter = playerConv || playerConverter;
    var currentString = $("#ghost-val").text();
    var wordSoFar = currentString + newLetter.toUpperCase();
    $("#ghost-val").text(wordSoFar);

    checkMove(wordSoFar, player);
  }

  return {
    appendLetter: appendLetter
  }
})();