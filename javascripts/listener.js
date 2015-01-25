$(document).ready(function() {
  letterListener();
});

var letterListener = function() {
  $(this).on("keyup", function(e) {
    var newLetter = String.fromCharCode(e.keyCode);
    if(newLetter.match(/[a-zA-Z]/)) {
      var currentString = $("#ghost-val").text();
      var wordSoFar = currentString + newLetter;
      $("#ghost-val").text(wordSoFar);
      // $(this).off("keyup");

      var isWord = Trie.search(wordSoFar.toLowerCase());
      if(isWord) {
        console.log("game over");
        console.log("word formed");
      }

    }
  });
}