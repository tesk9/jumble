var Trie = (function() {
  var search = function(word, callback) {
    console.log(word)

    $.ajax({
      url: '/trie/' + word,
      type: 'GET',
      success: function(data) {
        console.log(data);
        if(callback) {
          callback(data);
        }
      }
    });
  }

  return {
    search: search
  }
})();