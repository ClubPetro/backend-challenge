const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM lugares ORDER BY meta ASC;',
            (error, result, fields) =>{
                if (error) { return res.status(500).send({ error: error })}
                const response = {
                    quantidade: result.length,
                    lugares: result.map(prod => {
                        return {
                            idlugares: prod.idlugares,
                            pais: prod.pais,
                            local: prod.local,
                            meta: prod.meta,
                            bandeira: prod.bandeira,
                            created: prod.created,
                            updated: prod.updated,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um lugar específico.',
                                url: 'https://localhost:3000/lugares/' + prod.idlugares
                            }

                        }
                    })
                }
                return res.status(200).send({response})
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
            "SELECT COUNT(*) FROM lugares WHERE local =? AND pais = ? AND (SELECT COUNT(*) FROM lugares WHERE pais = ?) >= 1",
            [req.body.local, req.body.pais,req.body.pais],
            (error,result,fields)=>{
                conn.release();
                if (error) {
                    console.log(error);
                    res.status(500).send('Erro ao buscar o lugar similar');
                }
                else if (result[0]['COUNT(*)'] > 0) {
                    res.status(400).send('Um lugar com este nome, neste país, já possui um registro no sistema');
                }
                else {
                    conn.query(
                        "INSERT INTO lugares (pais, local, meta, bandeira, created, updated) VALUES (?,?,?,?,?,?)", 
                        [req.body.pais, req.body.local, req.body.meta, req.body.bandeira, dateNow, dateNow], 
                        (error, result, fields)=>{
                            conn.release();

                            if (error) { return res.status(500).send({ error: error});}

                            const response = {
                                mensagem: 'Lugar inserido com sucesso',
                                lugarCriado: {
                                    idlugares: result.insertId,
                                    pais: req.body.pais,
                                    local: req.body.local,
                                    meta: req.body.meta,
                                    bandeira: req.body.bandeira,
                                    created: req.body.created,
                                    updated: req.body.updated,
                                    request: {
                                        tipo: 'POST',
                                        descricao: 'Lugar inserido.',
                                        url: 'https://localhost:3000/lugares'
                                    }
                                }
                            }
                            
                            return res.status(201).send(response)
                            
                        }
                    );
                }
            }
        )
    })
});

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let dateNow = year + "-" + month + "-" + date;
        conn.query(
            `UPDATE lugares SET local = ?, meta = ?, updated = ? WHERE idlugares = ?`,
            [
                req.body.local, 
                req.body.meta,
                dateNow,
                req.body.idlugares
            ],
            (error, result, field) => {
                conn.release();

                if (error) { return res.status(500).send({error: error,});}

                const response = {
                    mensagem: 'Lugar alterado com sucesso',
                    lugarAlterado: {
                        idlugares: req.body.idlugares,
                        local: req.body.local,
                        meta: req.body.meta,
                        updated: dateNow,
                        request: {
                            tipo: 'POST',
                            descricao: 'Lugar recém alterado.',
                            url: 'https://localhost:3000/lugares/' + req.body.idlugares
                        }
                    }
                
                }
                return res.status(201).send(response)
            }
        )
    })
});

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'O Lugar foi deletado'
    })
});

module.exports = router;