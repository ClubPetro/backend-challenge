var db = require('../db')
var express = require('express');
var router = express.Router();

function AcertaDataCadastro(data){
    var dataData = data.split("/",2)
    var meta = new Date(`${dataData[1]}-${dataData[0]}`)
    return meta
}

router.get('/', function (req, res) {
    const placesExport = []
    db.findAll((err, places) =>  {
        if (err) {
            console.log(err);
        }
        res.json(places)
    })

});

router.get('/:id', function (req, res) {
    id = req.params.id
    db.findOne(id, (err, places) =>  {
        if (err) {
            console.log(err);
        }
        res.json(places)
    })

});

router.post('/', async function (req, res) {

    var country_id = req.body.country_id
    var place = req.body.place
    var meta = AcertaDataCadastro(req.body.meta)
    var data_criacao = new Date()
    var data_edicao = data_criacao
    var url_bandeira, pais

    db.findOneCountry(country_id, (err, country) => {
        if(err){console.log(err)}
        url_bandeira = country[0].url_bandeira
        pais = country[0].nome
    })

    db.findPlaceCountry({ country_id, place }, (err, result) => {
        if (err) {console.log(err) }


        if (!result[0]) {
            db.add({ country_id, pais, url_bandeira, place, meta, data_criacao, data_edicao }, (err, result) => {
                if (err) { console.log(err) }
                res.json(result.ops).status(200)
            })
        } else {
            res.status(400).send("Ja cadastrado")
        }
    })


})

router.put('/:id', function (req, res) {

    var id = req.params.id
    var place = req.body.place
    var meta = AcertaDataCadastro(req.body.meta)
    var data_edicao = new Date()
   
    db.edit({id, place,meta,data_edicao}, (err, result) => {
        if(err){console.log(err)}
        db.findOne(id, (err, place) => {
            if(err){console.log(err)}
            res.json(place)
        })
    })

})

router.delete('/:id', function (req, res) {

    var id = req.params.id
   
   
    db.del(id, (err, result) => {
        if(err){console.log(err)}
       res.status(200).json(result)
    })

})


module.exports = router;