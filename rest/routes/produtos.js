const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna todos os produtos'
    });
});

router.post('/', (req, res, next) => {

    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };

    res.status(201).send({
        mensagem: 'Um novo produto foi criado',
        produtoCriado: produto
    });
});

//Retorna os dados de um produto
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;
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
        mensagem: 'O produto foi alterado'
    })
});

//Exclui um produto
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'O produto foi deletado'
    })
});

module.exports = router;