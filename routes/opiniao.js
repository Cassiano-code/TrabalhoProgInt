const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error}) }
        conn.query(
                    'SELECT * FROM opiniao',
            (error, resultado, fields)=>{
                if (error) {return res.status(500).send({ error: error}) }
                return res.status(200).send({response: resultado})
            }
        )  

    })

});

router.post('/', (req, res, next) => {
/*    const opiniao = {
        vacina: req.body.vacina,
        remedio: req.body.remedio,

    } */
    mysql.getConnection((error, conn)=>{
        if (error) {return res.status(500).send({ error: error}) }
        conn.query(
            "INSERT INTO opiniao(vacina,remedio) VALUES(? ,?)",
            [req.body.vacina, req.body.remedio],
            (error, resultado, field) =>{
                conn.release();
                if (error) {return res.status(500).send({ error: error}) }
                res.status(201).send({
                    mensagem: "Produto inserido com sucesso",
                    id_opiniao: resultado.insertId,
                }); 
                
            }

        )
    });

});

router.get('/:id_opniao', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM opiniao WHERE id_opniao =?;',
            [req.params.id_opniao],

            (error, resultado, fields)=>{
                if (error) {return res.status(500).send({ error: error}) }
                return res.status(200).send({response: resultado})
            }
        )  

    })

});

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if (error) {return res.status(500).send({ error: error}) }
        conn.query(
            `UPDATE opiniao 
                SET vacina = ?,
                remedio = ?
            WHERE id_opniao = ?`,
            [req.body.vacina,
             req.body.remedio,
             req.body.id_opniao
            ],

            (error, resultado, field) =>{
                conn.release();
                if (error) {return res.status(500).send({ error: error}) }
                res.status(202).send({
                    mensagem: "Opiniao alterada com sucesso",
                    
                }); 
                
            }

        )
    });

});

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if (error) {return res.status(500).send({ error: error}) }
        conn.query(
            `DELETE FROM opiniao WHERE id_opniao =?`,[req.body.id_opniao],

            (error, resultado, field) =>{
                conn.release();
                if (error) {return res.status(500).send({ error: error}) }
                res.status(202).send({
                    mensagem: "Opiniao deletada com sucesso",
                    
                }); 
                
            }

        )
    });
});

module.exports = router;