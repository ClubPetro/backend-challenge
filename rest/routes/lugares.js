const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM lugares ORDER BY meta ASC;',
            (error, resultado, fields) =>{
                if (error) { return res.status(500).send({ error: error })}
                return res.status(200).send({response: resultado})
            }
        )
    })
});

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let dateNow = year + "-" + month + "-" + date;
        conn.query(
            'INSERT INTO lugares (pais, local, meta, bandeira, created, updated) VALUES (?,?,?,?,?,?)',
            [req.body.pais, req.body.local, req.body.meta, req.body.bandeira, dateNow, dateNow],
            (error, resultado, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error, response: null });}

                res.status(201).send({
                    mensagem: 'Um novo Lugar foi criado',
                    idlugares: resultado.insertId
                })
            }
        )
    })
});

//Retorna os dados de um produto
router.get('/:idlugares', (req, res, next) => {
    const id = req.params.idlugares;
    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'você descobriu o id especial',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'Você passou um id'
        });
    }
});

//Altera um produto
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'O Lugar foi alterado'
    })
});

//Exclui um produto
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'O Lugar foi deletado'
    })
});

module.exports = router;