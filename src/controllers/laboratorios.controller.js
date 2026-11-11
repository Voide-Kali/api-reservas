const service = require("../services/laboratorios.service");

async function listarLaboratorios(req, res) {
    try {
        res.json(await service.listar());
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

async function buscarLaboratorio(req, res) {
    try {
        res.json(await service.buscar(req.params.id));
    } catch (e) {
        res.status(e.message.includes("não encontrado") ? 404 : 400).json({ erro: e.message });
    }
}

async function criarLaboratorio(req, res) {
    try {
        res.status(201).json(await service.criar(req.body));
    } catch (e) {
        res.status(400).json({ erro: e.message });
    }
}

async function atualizarLaboratorio(req, res) {
    try {
        res.json(await service.atualizar(req.params.id, req.body));
    } catch (e) {
        res.status(e.message.includes("não encontrado") ? 404 : 400).json({ erro: e.message });
    }
}

async function deletarLaboratorio(req, res) {
    try {
        await service.deletar(req.params.id);
        res.status(204).send();
    } catch (e) {
        res.status(e.message.includes("não encontrado") ? 404 : 400).json({ erro: e.message });
    }
}

module.exports = {
    listarLaboratorios,
    buscarLaboratorio,
    criarLaboratorio,
    atualizarLaboratorio,
    deletarLaboratorio
};
