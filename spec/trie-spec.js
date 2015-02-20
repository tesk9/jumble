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
    it("returns false if letter finishes a word", function() {
      this.nodeB.setAsWord(true);
      expect(this.node.getLetter("b").value).toEqual("b");
    });

    it("returns false if letter is not found", function() {
      expect(this.node.getLetter("c")).toEqual(false);
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

  describe("getDescendents", function() {
    beforeEach(function() {
      this.tree.addWord("bananas");
      this.tree.addWord("baracuda");
    });

    it("returns the last node of the word if it is found in tree", function() {
      expect(this.tree.getDescendents("bananas").value).toBe("s");
      expect(this.tree.getDescendents("baracuda").value).toBe("a");
      expect(this.tree.getDescendents("ba").value).toBe("a");
    });

    it("returns false if word is not in tree", function() {
      expect(this.tree.getDescendents("cat")).toBe(false);
      expect(this.tree.getDescendents("cannert")).toBe(false);
      expect(this.tree.getDescendents("daq")).toBe(false);
      expect(this.tree.getDescendents('delint')).toBe(false);
    });

    it("continues to search even if sub-word is found", function() {
      this.tree.addWord("ban");
      expect(this.tree.getDescendents("ban").value).toBe("n");
      expect(this.tree.getDescendents("bana").value).toBe("a");
      expect(this.tree.getDescendents("bananas").value).toBe("s");
    });
  });
});