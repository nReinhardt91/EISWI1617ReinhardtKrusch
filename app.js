var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = require('mongodb').MongoClient, format = require('util').format;
var mongoose = require('mongoose');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

/*********************************************
Now using Mongoose. for quick overview : http://mongoosejs.com/docs/
http://blog.modulus.io/getting-started-with-mongoose/
*********************************************/

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.log("connected to Database.");
  // Create your schemas and models here.
  var articleSchema = new mongoose.Schema({
    name: String,
    preis: Number,
    waehrung: String,
    ort: String
  });
  var Articles = mongoose.model('Articles', articleSchema);

  app.get('/articlelist', function (req, res) {
    console.log('I received Get')
    Articles.find(function (err, data) {
      if(err) {
        response = {"error" : true,"message" : "Error fetching data"};
      } else {
        response = {"error" : false,"message" : data};
      }
      res.json(data);
      console.log(res.header); // true
    });
  });
  app.post('/articlelist', function (req, res){
    console.log(req.body);

    
  });

  /* // Muster für das einbinden der Articles
  var clubMate = new Article({
    name: "Club Mate",
    preis: "1",
    waehrung: "Eur",
    ort: "Köln"
  });

  clubMate.save(function(err, thor) {
    if(err){
      return console.error(err);
    }
    console.dir(clubMate);
  });
  */
});
mongoose.connect("mongodb://test:test@ds139187.mlab.com:39187/eis_test");

/*
db.connect("mongodb://test:test@ds139187.mlab.com:39187/eis_test", function(err, db) {
  if(err) {
    return console.dir(err);
  }else {
    console.log("connected to database");
    var test = db.createCollection("test");

    /*
    var docs = db.articlelist.find();
    console.log(docs)

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

    db.close();
  }
});
*/
app.listen(3000);
console.log("Server running on Port 3000");
