$(document).ready(function() {
  letterListener();
  playerConverter = playerChangeHandler();

  $(".reset").on('click', function() {
    $("#ghost-val").text("");
    $("#message-header").children().remove();
    $("button.reset").off("click");
    playerConverter = playerChangeHandler();
    console.log(playerConverter.player1);
    letterListener();
  });

});

var playerConverter;

var letterListener = function() {
  var player = "player1";
  $(this).on("keyup", function(e) {
    var newLetter = String.fromCharCode(e.keyCode);
    if(newLetter.match(/[a-zA-Z]/)) {
      page.appendLetter(newLetter, player, playerConverter);
      $(this).off("keyup");
    }
  });
}

var playerChangeHandler = function() {
  var opponent = $(".unbeatable input:checked").val();
  var playerConverter = {player1: opponent, player2: "player1", unbeatable: "player1"}
  return playerConverter;
};
