$(document).ready(function() {
  letterListener();
});

var letterListener = function() {
  var player = "player1"
  $(this).on("keyup", function(e) {
    var newLetter = String.fromCharCode(e.keyCode);
    if(newLetter.match(/[a-zA-Z]/)) {
      page.appendLetter(newLetter, player);
      $(this).off("keyup");
    }
  });
}