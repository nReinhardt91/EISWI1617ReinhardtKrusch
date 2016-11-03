var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var db = mongojs('articlelist', ['articlelist']);


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/articlelist', function (req, res) {
    console.log('I received Get')
    
    db.articlelist.find(function(err, docs) {
       console.log(docs);
        res.json(docs);
    });
});

app.post('/articlelist', function (req, res){
   console.log(req.body); 
    
    db.articlelist.insert(req.body, function(err, doc){
       res.json(doc);
    });
});

app.listen(3000);
console.log("Server running on Port 3000");