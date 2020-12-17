const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaOpiniao = require('./routes/opiniao');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/opiniao', rotaOpiniao);

app.use((req, res, next)=> {
    const erro = new Error('Não achou resultados');
    erro.status= 404;
    next(erro);
});

app.use((error, req, res, next)=>{

    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }

    });

});



module.exports = app;