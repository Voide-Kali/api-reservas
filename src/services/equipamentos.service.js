const model = require("../models/equipamentos.model");
const { converterId } = require("../utils/objectId");

module.exports = {
    listar: () => model.listar(),

    buscar: async (id) => {
        const item = await model.buscarPorId(converterId(id));
        if (!item) throw new Error("Equipamento não encontrado");
        return item;
    },

    criar: (dados) => {
        const { nome, descricao, quantidade } = dados;
        if (!nome || quantidade == null)
            throw new Error("Nome e quantidade são obrigatórios");

        return model.criar({ nome, descricao, quantidade });
    },

    atualizar: async (id, dados) => {
        await module.exports.buscar(id);
        const { nome, descricao, quantidade } = dados;

        if (!nome || quantidade == null)
            throw new Error("Nome e quantidade são obrigatórios");

        return model.atualizar(converterId(id), { nome, descricao, quantidade });
    },

    deletar: async (id) => {
        await module.exports.buscar(id);
        return model.deletar(converterId(id));
    }
};
