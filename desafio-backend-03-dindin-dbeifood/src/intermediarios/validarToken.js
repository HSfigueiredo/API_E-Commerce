const jwt = require('jsonwebtoken')
const chave = require('../chaveSecreta')

const validarToken = (req, res, next) => {
    let { authorization } = req.headers

    try {
        const token = authorization.split(' ')[1]
        const usuario = jwt.verify(token, chave)

        if (usuario) {
            req.usuario = usuario
        };

        next()
    } catch (error) {
        return res.status(400).json({ mensagem: 'Falha no token' })
    }
}






module.exports = {
    validarToken


}