const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retornando todos os pedidos desejados'
    });
});

router.post('/', (req, res, next) => {

    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    };

    res.status(201).send({
        mensagem: 'Pedido foi criado',
        pedidoCriado: pedido
    });
});

//Retorna os dados de um pedido
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido;
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

//Exclui um pedido
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Pedido excluido'
    })
});

module.exports = router;