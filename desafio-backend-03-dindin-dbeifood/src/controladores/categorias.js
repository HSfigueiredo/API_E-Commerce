const knex = require('../conexao')

const listarCategoria = async (req, res) => {

    try {
        const categorias = await knex('categorias');

        return res.status(200)
            .json(categorias);
    } catch (erro) {
        return res.status(403)
            .json({ mensagem: ' o usuário não tem permissão de acessar o recurso solicitado' })
    }
};

module.exports = {
    listarCategoria
}