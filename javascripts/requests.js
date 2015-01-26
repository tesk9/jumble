var Trie = (function() {
  var search = function(word, callback) {
    $.ajax({
      url: '/trie/' + word,
      type: 'GET',
      success: function(data) {
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