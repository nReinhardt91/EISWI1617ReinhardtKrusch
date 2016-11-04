var http = require('http');
var mongoose = require('mongoose');

var db = mongoose.connection;
var date = new Date();
var current_hour = 18; // date.getHours(); // die 18 ist für Debugging & Testzwecke

db.on('error', console.error);
db.once('open', function() {
  console.log("connected to Database.");
  var userSchema = new mongoose.Schema({ //Mongoose-Schema für DB-Collection
    name: String,
    adress : String,
    time: String
  });
  var User = mongoose.model('Users', userSchema);
  //Wurde einmal benutzt, um Dummy-Data zu erstellen, später durch Anmeldung
  /**************************************************************
  var Testy_McTestface = new User({name: 'fluffy', adress: 'Lümmelstadt', time: 'evening' });
  Testy_McTestface.save(function (err, fluffy) {
  if (err) return console.error(err);
  });
  ***********************************************************************/
  var options = {
    host: 'localhost',
    path: '/articlelist',
    port: '3000',
    method: 'GET'
  };
  //HTTP GET auf die Angebote. Prinzip ist klar,
  /*************************************************
  callback = function(response) {
    var str = '';
    response.on('data', function (chunk) {
      str += chunk;
    });
    response.on('end', function () {
      console.log(str);
    });
  }
  http.request(options, callback).end();
  ***************************************************/

  var work = function(){ // im aktuellen Zustand sollte "Fluffy" als User ausgegeben werden
    var oldDate = 17;
    if(current_hour>oldDate||(oldDate==24&&current_hour==0)){ // jedesmal wenn die Stunde ändert (Speziafall 24 Uhr -> 0 Uhr)
      oldDate=current_hour;

      switch(current_hour){
        case 10:
            User.find({'time':'morning'},function (err, data) {
              if(err) {
                console.log("Fehler: morningPeoples");
              } else {
                console.log(data);
              }
            });
            break;
        case 14:
            User.find({'time':'midday'},function (err, data) {
              if(err) {
                console.log("Fehler: middayPeoples");
              } else {
                console.log(data);
              }
            });
            break;
        case 18:
            User.find({'time':'evening'},function (err, data) {
              if(err) {
                console.log("Fehler: eveningPeoples");
              } else {
                console.log(data);
              }
            });
            break;
    }
  }
};
setInterval(work, 1000); // jede Sekunde ausführen (aus Testzwecken, später auf 900000 für 15 Minuten stellen)
});
mongoose.connect("mongodb://test:test@ds139187.mlab.com:39187/eis_test"); // externe DB #TODO: neuen Benutzer für Niklas erstellen

console.log("Server is running");
