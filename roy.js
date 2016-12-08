var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.use('/articlelist', function (req, res, next) {

    console.log('Request Type:', req.method);
    next();

});

/*********************************************
Now using Mongoose. for quick overview :
http://mongoosejs.com/docs/
http://blog.modulus.io/getting-started-with-mongoose/
*********************************************/

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.log("connected to Database.");
  // Create your schemas and models here.
  var articleSchema = new mongoose.Schema({ //Schema für article-Collection
    name: String,
    angebotspreis: Number,
    waehrung: String,
    laden: String,
    adresse: String,
    angebotstag: String,
    //normalpreis: Number,
    kategorie: String,
    inhaltsstoffe: [],
    kategorieNummer: Number
  });
  var Articles = mongoose.model('Articles', articleSchema);

  app.get('/articlelist', function (req, res) {
   
    console.log('I received Get');
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
    //Vergleich welche Kategorie eingegeben wurde. Kategorie einsortierung wird noch ergänzt. Bisher 2 Kategorien Frisch und Tiefkühl, auswahl wird noch erweitert.
    if (req.body.kategorie.indexOf("Frisch") == 0){
        req.body.kategorieNummer = 1;
    
      
            Articles.create(req.body, function(err, doc){ // neuen Datensatz anlegen

                  if(err){
                    return console.dir(err);
                  }else{
                    res.json(doc);
                      console.log(req.body._id);
                 }


              });
    } else {
        req.body.kategorieNummer = 2;
         Articles.create(req.body, function(err, doc){ // neuen Datensatz anlegen
        
      if(err){
        return console.dir(err);
      }else{
        res.json(doc);
          console.log(req.body._id);
            }
    
    
  });
    }
    
  });
    
 app.delete('/articlelist/:id', function (req, res){
   var id = req.params.id;
    console.log(id);
    Articles.findByIdAndRemove(req.params.id, function (err) {
       if (err) return handleError(err); 
    });
 });
    //Geht noch nicht
//app.delete('/articlelist/', function(req, res){ 
//   Articles.find({article: id}, function(err, result){
//      Articles.remove(req.params.id); 
//   }); 
//});
});

mongoose.connect("mongodb://test:test@ds139187.mlab.com:39187/eis_test");


app.listen(3000);
console.log("Server running on Port 3000");
