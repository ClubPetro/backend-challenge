var db = require('../db')
var express = require('express');
var router = express.Router();
const { resource } = require('../app');

router.get('/', function (req, res) {
    db.findAll((err, places) => {
        if (err) {
            console.log(err)
        }
        res.json(places)
    })
});

router.post('/', async function (req, res) {

    var country_id = req.body.country_id
    var place = req.body.place
    var meta = Date.parse(req.body.meta)
    var data_criacao = Date.now()
    var data_edicao = data_criacao


    db.add({ country_id, place, meta, data_criacao, data_edicao }, (err, result) => {
        if (err) { return console.log(err) }
        res.json(result.ops)
    })
})

module.exports = router;