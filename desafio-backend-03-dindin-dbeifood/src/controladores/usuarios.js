const knex = require('../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const chave = require('../chaveSecreta')


const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuarioCadastrado = await knex('usuarios')
            .insert({ nome, email, senha: senhaHash })
            .returning('*')

        if (!usuarioCadastrado) {
            return res.status(400)
                .json({ mensagem: 'Falha no cadastro' })
        }

        return res.status(201)
            .json(usuarioCadastrado)
    } catch (error) {
        return res.status(400)
            .json({ mensagem: 'Falha no cadastro' })
    }
}


const loginUsuario = (req, res) => {

    const { id, nome, email } = req.usuario

    const usuario = {
        id, nome, email
    };

    try {
        const token = jwt.sign(usuario, chave, { expiresIn: '1d' });

        return res.status(200).json({ usuario, token })
    } catch (error) {
        return res.status(400).json({ mensagem: 'Falha no login' })
    }
};


const detalharUsuario = (req, res) => {
    let { authorization } = req.headers
    try {
        const token = authorization.split(' ')[1]
        const { iat, exp, ...usuario } = jwt.verify(token, chave)

        return res.status(200).json(usuario)
    } catch (erro) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado' })
    }
};


const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    let { authorization } = req.headers
    try {

        const token = authorization.split(' ')[1]
        const { iat, exp, ...usuario } = jwt.verify(token, chave)

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuarioAtualizado = await knex('usuarios')
            .where('id', usuario.id)
            .update({ nome, email, senha: senhaHash })
            .returning('*')
        if (!usuarioAtualizado) {
            return res.status(400).json({
                mensagem: 'Não foi possivel Atualizar os Dados'
            })
        }

        return res.status(204).json()
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}


module.exports = {
    cadastrarUsuario,
    loginUsuario,
    detalharUsuario,
    atualizarUsuario,
}
