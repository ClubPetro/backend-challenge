var express = require('express');
var router = express.Router();
var db = require('../db')

router.get('/', function(req, res) {
  db.findAllCountrys((err, countrys) =>{
    if (err){
      return console.log(err)
    }
    res.json(countrys)
  })
});

router.get('/:id', function(req, res) {
  var id = req.params.id
  db.findOneCountry(id, (err, countrys) =>{
    if (err){
      return console.log(err)
    }
    res.json(countrys)
  })
});

router.post('/', function (req, res) {

  var nome = req.body.nome
  var url_bandeira = req.body.url_bandeira
  
  db.addCountry({ nome, url_bandeira }, (err, result) => {
      if (err) { 
        return console.log(err)
       }
        res.json(result.ops)
  })

  
})
module.exports = router;
