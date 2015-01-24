var TrieAndNode = require("../dictTrie");
var trie = new TrieAndNode();

describe("Node", function(argument) {
  beforeEach(function() {
    this.node = new trie.Node("a");
    this.nodeB = this.node.addLetter("b");
  })

  describe("addLetter", function() {
    it("Adds letter to children", function() {
      expect(this.nodeB instanceof trie.Node).toBe(true);
      expect(this.node.children.b).toBe(this.nodeB);
    }) 
  })

  describe("setAsWord", function() {
    it("Sets isWord property of node", function() {
      expect(this.node.isWord).toBe(false);
      this.node.setAsWord(true);
      expect(this.node.isWord).toBe(true);
      expect(this.nodeB.isWord).toBe(false);
    }) 
  })
})

describe("Trie", function() {
  beforeEach(function() {
    this.tree = new trie.Trie();
  })

  it("creates a Trie", function() {
    expect(this.tree instanceof trie.Trie).toBe(true);
  })

  describe("addWord", function() {
    beforeEach(function() {
      this.tree.addWord("hello");
    })

    it("adds letter 'h' node to trie", function() {
      expect(this.tree.root.children.h instanceof trie.Node).toBe(true);
    })

    it("adds letter 'e' at appropriate level", function() {
      expect(this.tree.root.children.e).toBe(undefined); 
      expect(this.tree.root.children.h.children.e.value).toBe("e");
    })

    it("updates word status of last letter of word", function() {
      expect(this.tree.root.children.h.children.e.children.l.children.l.children.o.isWord).toBe(true)
    })
  })
})