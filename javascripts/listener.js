$(document).ready(function() {
  $(this).on("keyup", function(e) {
    var newLetter = String.fromCharCode(e.keyCode);
    if(newLetter.match(/[a-zA-Z]/)) {
      var currentString = $("#ghost-val").text();
      $("#ghost-val").text(currentString + newLetter);
    }
  });
});