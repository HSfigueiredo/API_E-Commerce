const knex = require('../conexao')
const bcrypt = require('bcrypt')

const validarCorpoLogin = (req, res, next) => {
    const { email, senha } = req.body

    try {
        if (!email) {
            return res.status(400).json({
                mensagem: 'Informe o E-mail'
            })
        }

        if (!senha) {
            return res.status(400).json({
                mensagem: 'Informe a Senha'
            })
        }
        next()
    } catch (error) {
        return res.status(400).json({ mensagem: 'Falha no cadastro' })
    }
}

const verificarSenha = async (req, res, next) => {
    const { email, senha } = req.body

    try {

        const usuarioEncontrado = await knex('usuarios')
            .where({ email }).first()

        const compararSenha = await bcrypt
            .compare(senha, usuarioEncontrado.senha)

        if (!compararSenha) {
            return res.status(400).json({
                mensagem: 'Usuário ou Senha inválidos'
            })
        }

        req.usuario = usuarioEncontrado;

        next()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.menssage
        })
    }
};

module.exports = {
    validarCorpoLogin,
    verificarSenha
}