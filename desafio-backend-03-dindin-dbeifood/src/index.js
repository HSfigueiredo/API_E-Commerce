const express = require('express');

const usuariosRota = require('./rotas/usuarios')
const transacoesRota = require('./rotas/transacoes')
const categoriaRota = require('./rotas/categoria')

const app = express();

app.use(express.json());

app.use('/usuario', usuariosRota)
app.use('/transacao', transacoesRota)
app.use('/categoria', categoriaRota)




app.listen(3000, () => {
    console.log('Servidor rodando na porta http://localhost:3000')
});