const validarUsuario = (req, res, next) => {
    let { nome, email, senha } = req.body

    try {
        if (!nome) {
            return res.status(400).json({
                mensagem: 'Nome obrigatório'
            })
        }

        if (!email) {
            return res.status(400).json({
                mensagem: 'E-mail obrigatório'
            })
        }

        if (!senha) {
            return res.status(400).json({
                mensagem: 'Senha Obrigatório'
            })
        }

        next()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}




module.exports = {
    validarUsuario
}