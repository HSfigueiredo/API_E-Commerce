const knex = require('../conexao')

const verificarEmailCadastrado = async (req, res, next) => {
    try {
        let { email } = req.body

        const emailDuplicado = await knex('usuarios')
            .where({ email });


        if (emailDuplicado.rowCount > 0) {
            return res.status(400).json({
                mensagem: 'O e-mail informado já está sendo utilizado por outro usuário.'
            })
        }

        next()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}


const verificarEmailExiste = async (req, res, next) => {
    try {
        let { email } = req.body

        const emailExiste = await knex('usuarios')
            .where({ email })

        if (emailExiste[0].email != email) {
            return res.status(400).json({
                mensagem: 'Email Incorreto'
            })
        }

        next()
    } catch (error) {
        return res.status(400).json({ mensagem: 'Falha na validação do email' })
    }
}

module.exports = {
    verificarEmailCadastrado,
    verificarEmailExiste
}