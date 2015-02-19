var TrieAndNode = require("../dictTrie");
var trie = new TrieAndNode();

describe("Node", function(argument) {
  beforeEach(function() {
    this.node = new trie.Node("a");
    this.nodeB = this.node.addLetter("b");
  });

  describe("addLetter", function() {
    it("Adds letter to children", function() {
      expect(this.nodeB instanceof trie.Node).toBe(true);
      expect(this.node.children.b).toBe(this.nodeB);
    });

    it("Child node has reference to parent", function() {
      expect(this.nodeB.parent.value).toBe(this.node.value);
    });
  });

  describe("setAsWord", function() {
    it("Sets isWord property of node", function() {
      expect(this.node.isWord).toBe(false);
      this.node.setAsWord(true);
      expect(this.node.isWord).toBe(true);
      expect(this.nodeB.isWord).toBe(false);
    });
  });

  describe("getLetter", function() {
    it("returns true if letter finishes a word", function() {
      this.nodeB.setAsWord(true);
      expect(this.node.getLetter("b", true)).toEqual(true);
    });

    it("returns the letter node if letter doesn't finish a word", function() {
      expect(this.node.getLetter("b")).toEqual(this.nodeB);
    });

    it("returns undefined if letter is not found", function() {
      expect(this.node.getLetter("c")).toEqual(undefined);
    });
  });
});

describe("Trie", function() {
  beforeEach(function() {
    this.tree = new trie.Trie();
  });

  it("creates a Trie", function() {
    expect(this.tree instanceof trie.Trie).toBe(true);
  });

  describe("addWord", function() {
    beforeEach(function() {
      this.tree.addWord("hello");
    });

    it("adds letter 'h' node to trie", function() {
      expect(this.tree.root.children.h instanceof trie.Node).toBe(true);
    });

    it("adds letter 'e' at appropriate level", function() {
      expect(this.tree.root.children.e).toBe(undefined); 
      expect(this.tree.root.children.h.children.e.value).toBe("e");
    });

    it("updates word status of last letter of word", function() {
      expect(this.tree.root.children.h.children.e.children.l.children.l.children.o.isWord).toBe(true)
    });
  });

  describe("search", function() {
    beforeEach(function() {
      this.tree.addWord("bananas");
      this.tree.addWord("baracuda");
    });

    it("returns true if word is in tree", function() {
      expect(this.tree.search("bananas")).toBe(true);
      expect(this.tree.search("baracuda")).toBe(true);
    });

    it("returns false if word is not in tree", function() {
      expect(this.tree.search("cat")).toBe(false);
      expect(this.tree.search("cannert")).toBe(false);
      expect(this.tree.search("daq")).toBe(false);
      expect(this.tree.search('delint')).toBe(false);
      expect(this.tree.search("b")).toBe(false);
    });

    it("continues to search even if sub-word is found", function() {
      this.tree.addWord("ban");
      expect(this.tree.search("ban")).toBe(true);
      expect(this.tree.search("bana")).toBe(false);
      expect(this.tree.search("bananas")).toBe(true);
    });
  });
});