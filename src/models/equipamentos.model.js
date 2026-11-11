const { getDB } = require("../database/database");

const collection = () => getDB().collection("equipamentos");

module.exports = {
    listar: () => collection().find().toArray(),
    buscarPorId: (id) => collection().findOne({ _id: id }),
    criar: async (dados) => {
        const resultado = await collection().insertOne(dados);
        return collection().findOne({ _id: resultado.insertedId });
    },
    atualizar: async (id, dados) => {
        await collection().updateOne({ _id: id }, { $set: dados });
        return collection().findOne({ _id: id });
    },
    deletar: (id) => collection().deleteOne({ _id: id })
};
