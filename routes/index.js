const { render } = require("../app");
var express = require('express');
var router = express.Router();

router.get('/api/v1', function (req, res) {
    res.render('index');

});

module.exports = router;