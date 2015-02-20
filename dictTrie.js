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
    if(this.children[letter] == undefined) {
      return false;
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
    var finalNode = this.getDescendents(word, node, ind);
    if(finalNode.isWord) {
      return true;
    } else if(finalNode) {
      return finalNode;
    } else {
      return false;
    }
  };

  Trie.prototype.getDescendents = function(word, node, ind) {
    node = node || this.root;
    ind = ind || 0;

    var wordEnd = (ind == word.length - 1) ? true : false;
    var nextNode = node.getLetter(word[ind], false);

    // If the node is the end of a word, return true
    if(nextNode && wordEnd) {
      return node.getLetter(word[ind], false);
    }

    // If the word isn't over:
    else if(nextNode && ind < word.length) {
      return this.getDescendents(word, nextNode, ind+1)
    }

    // If there is no node matching the current node, return false
    else if(!nextNode){
      return false;
    }
  };

  return {
    Trie: Trie,
    Node: Node
  }
}
