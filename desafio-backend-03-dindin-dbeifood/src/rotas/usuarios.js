const express = require('express');

const rotas = express.Router();

const {
    cadastrarUsuario,
    loginUsuario,
    detalharUsuario,
    atualizarUsuario
} = require('../controladores/usuarios');

const {
    verificarEmailCadastrado,
    verificarEmailExiste
} = require('../intermediarios/validacaoEmail');

const {
    validarCorpoLogin,
    verificarSenha
} = require('../intermediarios/validacaoLogin');

const {
    validarUsuario
} = require('../intermediarios/validacaoUsuario');
const { validarToken } = require('../intermediarios/validarToken');


rotas.post('/', validarUsuario, verificarEmailCadastrado, cadastrarUsuario)

rotas.post('/login', validarCorpoLogin, verificarEmailExiste, verificarSenha, loginUsuario)


rotas.use(validarToken)


rotas.get('/', detalharUsuario)

rotas.put('/', validarUsuario, verificarEmailCadastrado, atualizarUsuario)


module.exports = rotas;
