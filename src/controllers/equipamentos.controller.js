const db = require("../database/database");

function listarEquipamentos(req, res) {
    const equipamentos = db
        .prepare("SELECT * FROM equipamentos")
        .all();

    res.json(equipamentos);
}

function buscarEquipamento(req, res) {
    const { id } = req.params;

    const equipamento = db
        .prepare("SELECT * FROM equipamentos WHERE id = ?")
        .get(id);

    if (!equipamento) {
        return res.status(404).json({
            erro: "Equipamento não encontrado"
        });
    }

    res.json(equipamento);
}

function criarEquipamento(req, res) {
    const { nome, descricao, quantidade } = req.body;

    if (!nome || !quantidade) {
        return res.status(400).json({
            erro: "Nome e quantidade são obrigatórios"
        });
    }

    try {
        const resultado = db
            .prepare(`
                INSERT INTO equipamentos (nome, descricao, quantidade)
                VALUES (?, ?, ?)
            `)
            .run(nome, descricao, quantidade);

        const equipamento = db
            .prepare("SELECT * FROM equipamentos WHERE id = ?")
            .get(resultado.lastInsertRowid);

        res.status(201).json(equipamento);
    } catch (erro) {
        res.status(400).json({
            erro: "Não foi possível criar o equipamento"
        });
    }
}

function atualizarEquipamento(req, res) {
    const { id } = req.params;
    const { nome, descricao, quantidade } = req.body;

    if (!nome || !quantidade) {
        return res.status(400).json({
            erro: "Nome e quantidade são obrigatórios"
        });
    }

    const equipamento = db
        .prepare("SELECT * FROM equipamentos WHERE id = ?")
        .get(id);

    if (!equipamento) {
        return res.status(404).json({
            erro: "Equipamento não encontrado"
        });
    }

    db.prepare(`
        UPDATE equipamentos
        SET nome = ?, descricao = ?, quantidade = ?
        WHERE id = ?
    `).run(nome, descricao, quantidade, id);

    const equipamentoAtualizado = db
        .prepare("SELECT * FROM equipamentos WHERE id = ?")
        .get(id);

    res.json(equipamentoAtualizado);
}

function deletarEquipamento(req, res) {
    const { id } = req.params;

    const resultado = db
        .prepare("DELETE FROM equipamentos WHERE id = ?")
        .run(id);

    if (resultado.changes === 0) {
        return res.status(404).json({
            erro: "Equipamento não encontrado"
        });
    }

    res.status(204).send();
}

module.exports = {
    listarEquipamentos,
    buscarEquipamento,
    criarEquipamento,
    atualizarEquipamento,
    deletarEquipamento
};