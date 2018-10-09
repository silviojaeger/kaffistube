var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET cakes */
router.get('/cake', function(req, res, next) {
  var cakesJson = JSON.parse(fs.readFileSync('cakes.json', 'utf8'));
  console.log('Sicherheitslücke.....Client erhällt auch alle Email Adressen...noch fixen');
  res.json(cakesJson);
});

/* POST cake */
router.post('/cake', function(req, res, next) {
    var cakesJson = JSON.parse(fs.readFileSync('cakes.json', 'utf8'));
    var incomingJson = req.body;
    //Get the number of existing cakes
    var length = Object.keys(cakesJson).length;
    //Add the new cake to the JSON
    cakesJson[(length+1)] = incomingJson;
    //Write the JSON to FileSystem (pretty!!)
    fs.writeFileSync('cakes.json', JSON.stringify(cakesJson, null, 4), function (err) {if (err) throw err;});
    res.send(cakesJson);
});

module.exports = router;
