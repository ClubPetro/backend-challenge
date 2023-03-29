const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
        mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM produtos;',
            (error, result, fields) =>{
                if (error) { return res.status(500).send({ error: error })}
                const response = {
                    quantidade: result.length,
                    produtos: result.map(prod => {
                        return {
                            id_produtos: prod.id_produtos,
                            nome: prod.nome,
                            preco: prod.preco,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um produto específico.',
                                url: 'https://localhost:3000/produtos/' + prod.id_produtos
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
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, result, field) => {
                conn.release();

                if (error) {return res.status(500).send({error: error});}

                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado: {
                        id_produto: result.insertId,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere um produto.',
                            url: 'https://localhost:3000/produtos'
                        }
                    }
                }

                return res.status(201).send(response)
            }
        )
    })
});

//Retorna os dados de um produto
router.get('/:id_produtos', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM produtos WHERE id_produtos = ?;',
            [req.params.id_produtos],
            (error, result, fields) =>{
                if (error) { return res.status(500).send({ error: error })}

                if(result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado o produto com este ID'
                    })
                }

                const response = {

                    Produto: {
                        id_produtos: result[0].id_produto,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um produto',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }

                return res.status(200).send({response: result})
            }
        )
    })
});

//Altera um produto
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            `UPDATE produtos SET nome = ?, preco = ? WHERE id_produtos = ?`,
            [   
                req.body.nome, 
                req.body.preco, 
                req.body.id_produtos
            ],
            (error, result, field) => {
                conn.release();

                if (error) { return res.status(500).send({error: error,});}

                const response = {
                    mensagem: 'Produto atualizado com sucesso',
                    produto: {
                        id_produto: result.insertId,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de um produto específico',
                            url: 'https://localhost:3000/produtos/' + result.id_produtos
                        }
                    }
                }

                res.status(202).send({
                    mensagem: 'Produto alterado com sucesso!'
                })
            }
        )
    })
});

//Exclui um produto
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            `DELETE FROM produtos WHERE id_produtos = ?`, [req.body.id_produtos],

            (error, result, field) => {
                conn.release();

                if (error) {return res.status(500).send({error: error});}

                res.status(202).send({
                    mensagem: 'Produto removido com sucesso!'
                })
            }
        )
    })
});

module.exports = router;