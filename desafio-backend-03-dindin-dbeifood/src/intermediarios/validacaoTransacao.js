const knex = require('../conexao')

const validacaoTransacao = async (req, res, next) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body

    try {
        if (!descricao) {
            return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' })
        }
        if (!valor) {
            return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' })
        }
        if (!data) {
            return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' })
        }
        if (!categoria_id) {
            return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' })
        }
        if (!tipo) {
            return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' })
        }

        const validarCategoria = await knex('categorias')
            .where({ id: categoria_id })

        if (validarCategoria.length === 0) {
            return res.status(400).json({ mensagem: 'Não existe categoria para o id informado' })
        }


        if (tipo === "saida" || tipo === "entrada") {
            next()
        } else {
            res.status(400).json({ mensagem: 'Informe o tipo corretamente' })
        }

    } catch (error) {
        return res.status(400).json({ mensagem: error.mensage })
    }
};

module.exports = {
    validacaoTransacao
}