const service = require("../services/equipamentos.service");

async function listarEquipamentos(req, res) {
    try {
        res.json(await service.listar());
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

async function buscarEquipamento(req, res) {
    try {
        res.json(await service.buscar(req.params.id));
    } catch (e) {
        res.status(e.message.includes("não encontrado") ? 404 : 400).json({ erro: e.message });
    }
}

async function criarEquipamento(req, res) {
    try {
        res.status(201).json(await service.criar(req.body));
    } catch (e) {
        res.status(400).json({ erro: e.message });
    }
}

async function atualizarEquipamento(req, res) {
    try {
        res.json(await service.atualizar(req.params.id, req.body));
    } catch (e) {
        res.status(e.message.includes("não encontrado") ? 404 : 400).json({ erro: e.message });
    }
}

async function deletarEquipamento(req, res) {
    try {
        await service.deletar(req.params.id);
        res.status(204).send();
    } catch (e) {
        res.status(e.message.includes("não encontrado") ? 404 : 400).json({ erro: e.message });
    }
}

module.exports = {
    listarEquipamentos,
    buscarEquipamento,
    criarEquipamento,
    atualizarEquipamento,
    deletarEquipamento
};
