var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* Cake.json PATH */
var cakePath = '';  //Linux:  /home/pi/kaffistube/kaffistube/kaffistube/

/*GET Homepage*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kaffistube' });
});

/* GET cakes */
router.get('/cake', function(req, res, next) {
  var cakesJson = JSON.parse(fs.readFileSync(cakePath+'cakes.json', 'utf8'));
  //Remove the email Adresses...safety first!
  for (let i in cakesJson){
    delete cakesJson[i].mail;
  }
  //send the JSON file
  res.json(cakesJson);
});

/* POST cake */
router.post('/cake', function(req, res, next) {
    var cakesJson = JSON.parse(fs.readFileSync(cakePath+'cakes.json', 'utf8'));
    var incomingJson = req.body;
    //Get the number of existing cakes
    var length = Object.keys(cakesJson).length;
    //Add the new cake to the JSON
    cakesJson[(length+1)] = incomingJson;
    //Write the JSON to FileSystem (pretty!!)
    fs.writeFileSync(cakePath+'cakes.json', JSON.stringify(cakesJson, null, 4), function (err) {if (err) throw err;});
    res.send(cakesJson);
});



module.exports = router;
