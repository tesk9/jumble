var express = require('express');
var fs = require('fs');
var jade = require("jade");
var dictTrie = require("./dictTrie");
var wordTrie = new dictTrie();
var trie = new wordTrie.Trie()
var app = express();

app.set('view engine', 'jade');

app.use(express.static(__dirname+ '/javascripts'));
app.use(express.static(__dirname+ '/style'));

fs.readFile('./text/2of12.txt', function(err, data) {
  if(err) { throw err; }
  var wordList = data.toString();
  var wordArr = wordList.split("\r\n");
  wordArr.forEach(function(v) {
    if(v.match(/^[a-z]*$/)) {
      trie.addWord(v);
    }
  })
})

app.get('/', function(req, res, next) {
  console.log("rendering index.jade");
  res.render("index");
})

app.get('/trie/:word', function(req, res, next) {
  res.send({answer: trie.search(req.params.word)})
})

var port = process.env.PORT || "8081";
var server = app.listen(port);
console.log("Application listening at ", port);