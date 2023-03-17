const knex = require('../conexao')

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body

    const usuario = req.usuario

    try {
        const transacaoCadastrada = await knex('transacoes')
            .insert({ descricao, valor, data, categoria_id, tipo, usuario_id: usuario.id })
            .returning('*')

        if (transacaoCadastrada.length === 0) {
            return res.status(400)
                .json({ mensagem: 'Não existe categoria para o id informado' })
        }

        const categoria = await knex('categorias').where({ id: categoria_id })

        if (categoria.length === 0) {
            return res.status(400)
                .json({ mensagem: 'Não existe categoria para o id informado' })
        }

        res.status(200).json({
            "id": transacaoCadastrada[0].id,
            "tipo": transacaoCadastrada[0].tipo,
            "descricao": transacaoCadastrada[0].descricao,
            "valor": transacaoCadastrada[0].valor,
            "data": transacaoCadastrada[0].data,
            "usuario_id": transacaoCadastrada[0].usuario_id,
            "categoria_id": transacaoCadastrada[0].categoria_id,
            "categoria_nome": categoria[0].descricao,
        })

    } catch (error) {
        return res.status(400)
            .json({ mensagem: error.mesage })
    }
}


const atualizarTransacao = async (req, res) => {
    const { id } = req.params;
    const usuario = req.usuario
    const { descricao, valor, data, categoria_id, tipo } = req.body

    try {
        const transacaoAtualizada = await knex('transacoes')
            .where({ id, usuario_id: usuario.id })
            .update({ descricao, valor, data, categoria_id, tipo })
            .returning('*')

        if (transacaoAtualizada.length === 0) {
            return res.status(400).json({ mensagem: 'Falha na Atualização' })
        }
        return res.status(204).json()
    } catch (error) {
        return res.status(400).json({ mensagem: error.mesage })
    }
}

const detalharTransacao = async (req, res) => {
    const { id } = req.params
    const usuario = req.usuario

    try {
        const detalhesTransacao = await knex('transacoes').where({ id, usuario_id: usuario.id })

        if (detalhesTransacao.length === 0) {
            return res.status(404)
                .json({ mensagem: 'Transação não existe' })
        }

        const categoria = await knex('categorias')
            .where({ id: detalhesTransacao[0].categoria_id })

        if (categoria.length === 0) {
            return res.status(400)
                .json({ mensagem: 'Não existe categoria para o id informado' })
        }

        res.status(200).json({
            "id": detalhesTransacao[0].id,
            "tipo": detalhesTransacao[0].tipo,
            "descricao": detalhesTransacao[0].descricao,
            "valor": detalhesTransacao[0].valor,
            "data": detalhesTransacao[0].data,
            "usuario_id": detalhesTransacao[0].usuario_id,
            "categoria_id": detalhesTransacao[0].categoria_id,
            "categoria_nome": categoria[0].descricao,
        })

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const listarTransacoes = async (req, res) => {
    const usuario = req.usuario

    const { filtro } = req.query

    try {
        const transacoesUsuario = await knex('transacoes')
            .where({ usuario_id: usuario.id })

        if (transacoesUsuario.length === 0) {
            return res.status(404)
                .json({ mensagem: 'Não há transações cadastradas' })
        }

        const categoriaNome = await knex('categorias');

        for (const transacao of transacoesUsuario) {
            for (const categoria of categoriaNome) {
                if (transacao.categoria_id == categoria.id) {
                    transacao.categoria_nome = categoria.descricao;
                }
            }
        }

        if (filtro) {
            const transacoesFiltradas = [];
            for (categoria of filtro) {
                for (transacao of transacoes) {
                    if (categoria == transacao.categoria_nome) {
                        transacoesFiltradas.push(transacao)
                    }
                }
            }
            console.log(transacoesFiltradas);
        }

        res.status(200).json(transacoesUsuario)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}


const excluirTransacao = async (req, res) => {
    const { id } = req.params
    const usuario = req.usuario

    try {
        await knex('transacoes')
            .where({ id, usuario_id: usuario.id }).del()

        return res.status(200).json()

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}


const extratoTransacao = async (req, res) => {
    const usuario = req.usuario

    let entrada = 0;
    let saida = 0;

    try {
        const transacoes = await knex('transacoes')
            .where({ usuario_id: usuario.id })

        transacoes.forEach(transacao => {
            if (transacao.tipo === 'entrada') {
                entrada += transacao.valor
            }

            if (transacao.tipo === 'saida') {
                saida += transacao.valor
            }
        })

        return res.status(200).json({
            entrada,
            saida
        })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = {
    cadastrarTransacao,
    detalharTransacao,
    listarTransacoes,
    atualizarTransacao,
    excluirTransacao,
    extratoTransacao
}
