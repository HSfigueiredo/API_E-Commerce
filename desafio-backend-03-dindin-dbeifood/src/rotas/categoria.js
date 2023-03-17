const express = require('express');

const rotas = express.Router();


const { listarCategoria } = require('../controladores/categorias');
const { validarToken } = require('../intermediarios/validarToken');


rotas.use(validarToken)

rotas.get('/', listarCategoria)

module.exports = rotas