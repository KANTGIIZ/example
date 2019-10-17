var express = require('express');
var app = express();
//setup mongodb
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var options = { useNewUrlParser: true, useUnifiedTopology: true };

//set the view engine to ejs
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
  res.render('pages/index');
});

// app.get("/product", function(req, res){
//     res.render('pages/product');
// });

app.get("/product/", function (req, res) {
  var classid = req.params.id;
  // Get the calss detail from mongodb
  MongoClient.connect(url, options, function (err, db) {
    if (err) throw err;
    var dbo = db.db("games");
    var query = { subject_id: classid };
    dbo.collection("games").find(query).toArray(function (err, result) {
      if (err) throw err;
      console.log(result); res.render('pages/product', { game: result });
      db.close();
    });
  });
});

app.get("/product/productdetail/:id", function (req, res) {
  var classid = req.params.id;
  // Get the calss detail from mongodb
  MongoClient.connect(url, options, function (err, db) {
    if (err) throw err;
    var dbo = db.db("games");
    var query = { id: classid };
    dbo.collection("games").findOne(query, function (err, result) {
      if (err) throw err;
      console.log(result); res.render('pages/productdetail', { game: result });
      db.close();
    });
  });
});

app.get("/product/editdetail/:id", function (req, res) {
  var classid = req.params.id;
  // Get the calss detail from mongodb
  MongoClient.connect(url, options, function (err, db) {
    if (err) throw err;
    var dbo = db.db("games");
    var query = { id: classid };
    dbo.collection("games").findOne(query, function (err, result) {
      if (err) throw err;
      console.log(result); res.render('pages/editdetail', { game: result });
      db.close();
    });
  });
});

app.listen(8080);
console.log('Express start at http://localhost:8080');
