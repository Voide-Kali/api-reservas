const service = require("../services/reservas.service");

async function listarReservas(req, res) {
    try {
        res.json(await service.listar());
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}

async function buscarReserva(req, res) {
    try {
        res.json(await service.buscar(req.params.id));
    } catch (e) {
        res.status(e.message.includes("não encontrada") ? 404 : 400).json({ erro: e.message });
    }
}

async function criarReserva(req, res) {
    try {
        res.status(201).json(await service.criar(req.body));
    } catch (e) {
        res.status(400).json({ erro: e.message });
    }
}

async function aprovarReserva(req, res) {
    try {
        res.json(await service.aprovar(req.params.id, req.body.aprovador_id));
    } catch (e) {
        res.status(400).json({ erro: e.message });
    }
}

async function recusarReserva(req, res) {
    try {
        res.json(await service.recusar(req.params.id, req.body.aprovador_id));
    } catch (e) {
        res.status(400).json({ erro: e.message });
    }
}

async function cancelarReserva(req, res) {
    try {
        res.json(await service.cancelar(req.params.id));
    } catch (e) {
        res.status(400).json({ erro: e.message });
    }
}

module.exports = {
    listarReservas,
    buscarReserva,
    criarReserva,
    aprovarReserva,
    recusarReserva,
    cancelarReserva
};
