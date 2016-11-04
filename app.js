var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = require('mongodb').MongoClient;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
// Connect to the db
db.connect("mongodb://test:test@ds139187.mlab.com:39187/eis_test", function(err, db) {
  if(err) {
    return console.dir(err);
  }else {
    console.log("connected to database")
  }

  var articlelist = db.collection('articlelist');

  app.get('/articlelist', function (req, res) {
    console.log('I received Get')

    articlelist.find(function(err, docs) {
      console.log(docs);
      res.json(docs).send(200);
    });
  });

  app.post('/articlelist', function (req, res){
    console.log(req.body);

    articlelist.insert(req.body, function(err, doc){
      if(err){
        return console.dir(err);
      }else{
        res.json(doc);
      }
    });
  });
});

app.listen(3000);
console.log("Server running on Port 3000");
