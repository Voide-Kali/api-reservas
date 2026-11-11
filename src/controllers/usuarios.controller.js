const service = require("../services/usuarios.service");

async function listarUsuarios(req, res) {
    try {
        res.json(await service.listar());
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

async function buscarUsuario(req, res) {
    try {
        res.json(await service.buscar(req.params.id));
    } catch (e) {
        res.status(e.message.includes("não encontrado") ? 404 : 400).json({ erro: e.message });
    }
}

async function criarUsuario(req, res) {
    try {
        res.status(201).json(await service.criar(req.body));
    } catch (e) {
        res.status(400).json({ erro: e.message });
    }
}

async function atualizarUsuario(req, res) {
    try {
        res.json(await service.atualizar(req.params.id, req.body));
    } catch (e) {
        res.status(e.message.includes("não encontrado") ? 404 : 400).json({ erro: e.message });
    }
}

async function deletarUsuario(req, res) {
    try {
        await service.deletar(req.params.id);
        res.status(204).send();
    } catch (e) {
        res.status(e.message.includes("não encontrado") ? 404 : 400).json({ erro: e.message });
    }
}

module.exports = {
    listarUsuarios,
    buscarUsuario,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};
