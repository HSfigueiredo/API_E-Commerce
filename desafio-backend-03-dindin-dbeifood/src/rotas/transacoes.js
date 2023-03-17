const express = require('express')

const {
    cadastrarTransacao,
    atualizarTransacao,
    listarTransacoes,
    detalharTransacao,
    excluirTransacao,
    extratoTransacao
} = require('../controladores/transacoes')

const {
    validacaoTransacao
} = require('../intermediarios/validacaoTransacao')
const { validarExclusaoTransacao } = require('../intermediarios/validarExclusaoTransacao')

const {
    validarToken
} = require('../intermediarios/validarToken')


const rotas = express.Router()


rotas.use(validarToken)


rotas.post('/', validacaoTransacao, cadastrarTransacao)

rotas.get('/extrato', extratoTransacao)

rotas.get('/:id', detalharTransacao)

rotas.get('/', listarTransacoes)

rotas.put('/:id', validacaoTransacao, atualizarTransacao)

rotas.delete('/:id', validarExclusaoTransacao, excluirTransacao)



module.exports = rotas