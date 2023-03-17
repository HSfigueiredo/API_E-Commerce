const knex = require('../conexao');

const validarExclusaoTransacao = async (req, res, next) => {
    const { id } = req.params;
    const usuario = req.usuario;

    try {
        const verificarTransação = await knex('transacoes')
            .where({ id, usuario_id: usuario.id })

        if (verificarTransação.length === 0) {
            return res.status(404).json({ mensagem: 'Transação não existe' })
        }
        next()
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
};

module.exports = {
    validarExclusaoTransacao
};