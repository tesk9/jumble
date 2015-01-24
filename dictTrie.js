module.exports = function() {
  var Node = function(letter) {
    this.value = letter || null;
    this.children = {};
    this.isWord = false;
  };

  Node.prototype.addLetter = function(letter) {
    if(!this.children[letter]) {
      this.children[letter] = new Node(letter);
    }
    return this.children[letter];
  };

  Node.prototype.setAsWord = function(isWord) {
    this.isWord = isWord;
  };

  Node.prototype.getLetter = function(letter, endInd) {
    if(this.children[letter] && this.children[letter].isWord && endInd) {
      return true;
    }
    return this.children[letter]
  };

  var Trie = function() {
    this.root = new Node();
  };

  Trie.prototype.addWord = function(word, node, ind) {
    node = node || this.root;
    ind = ind || 0;

    var nextNode = node.addLetter(word[ind]);
    if(ind == word.length - 1) {
      nextNode.isWord = true;
      return;
    }
    return this.addWord(word, nextNode, ind+1);
  };

  Trie.prototype.search = function(word, node, ind) {
    node = node || this.root;
    ind = ind || 0;

    var wordInd = (ind == word.length - 1) ? true : false;
    var nextNode = node.getLetter(word[ind], wordInd);

    if(nextNode === true && ind == word.length - 1) {
      return true;
    } else if(nextNode && ind < word.length - 1) {
      return this.search(word, nextNode, ind+1)
    } else {
      return false;
    }
  };

  return {
    Trie: Trie,
    Node: Node
  }
}
