$(document).ready(function() {
  letterListener();
  playerChangeHandler();

  $(".reset").on('click', function() {
    reset();
  });

});

var letterListener = function() {
  var player = "player1";
  $(this).off("keyup");
  $(this).on("keyup", function(e) {
    var newLetter = String.fromCharCode(e.keyCode);
    if(newLetter.match(/[a-zA-Z]/)) {
      page.appendLetter(newLetter, player);
      $(this).off("keyup");
    }
  });
}

var opponent = "player2";
var playerChangeHandler = function() {
  $(".unbeatable").on("click", function() {
    opponent = $(".unbeatable input:checked").val();
  });
};

var reset = function() {
  $("#ghost-val").text("");
  $("#message-header").children().remove();
  $("button.reset").off("click");
  letterListener();
}

