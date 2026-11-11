const model = require("../models/usuarios.model");
const { converterId } = require("../utils/objectId");

module.exports = {
    listar: () => model.listar(),

    buscar: async (id) => {
        const usuario = await model.buscarPorId(converterId(id));
        if (!usuario) throw new Error("Usuário não encontrado");
        return usuario;
    },

    criar: async (dados) => {
        const { nome, email, perfil } = dados;
        if (!nome || !email || !perfil)
            throw new Error("Nome, email e perfil são obrigatórios");

        if (await model.buscarPorEmail(email))
            throw new Error("Email já cadastrado");

        return model.criar({ nome, email, perfil });
    },

    atualizar: async (id, dados) => {
        await module.exports.buscar(id);

        const { nome, email, perfil } = dados;
        if (!nome || !email || !perfil)
            throw new Error("Nome, email e perfil são obrigatórios");

        return model.atualizar(converterId(id), { nome, email, perfil });
    },

    deletar: async (id) => {
        await module.exports.buscar(id);
        return model.deletar(converterId(id));
    }
};
