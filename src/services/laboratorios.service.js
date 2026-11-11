const model = require("../models/laboratorios.model");
const { converterId } = require("../utils/objectId");

module.exports = {
    listar: () => model.listar(),

    buscar: async (id) => {
        const item = await model.buscarPorId(converterId(id));
        if (!item) throw new Error("Laboratório não encontrado");
        return item;
    },

    criar: (dados) => {
        const { nome, localizacao, capacidade } = dados;
        if (!nome || !localizacao || capacidade == null)
            throw new Error("Nome, localização e capacidade são obrigatórios");

        return model.criar({ nome, localizacao, capacidade });
    },

    atualizar: async (id, dados) => {
        await module.exports.buscar(id);
        const { nome, localizacao, capacidade } = dados;

        if (!nome || !localizacao || capacidade == null)
            throw new Error("Nome, localização e capacidade são obrigatórios");

        return model.atualizar(converterId(id), { nome, localizacao, capacidade });
    },

    deletar: async (id) => {
        await module.exports.buscar(id);
        return model.deletar(converterId(id));
    }
};
