const db = require("../database/database");

function listarLaboratorios(req, res) {
    const laboratorios = db
        .prepare("SELECT * FROM laboratorios")
        .all();

    res.json(laboratorios);
}

function buscarLaboratorio(req, res) {
    const { id } = req.params;

    const laboratorio = db
        .prepare("SELECT * FROM laboratorios WHERE id = ?")
        .get(id);

    if (!laboratorio) {
        return res.status(404).json({
            erro: "Laboratório não encontrado"
        });
    }

    res.json(laboratorio);
}

function criarLaboratorio(req, res) {
    const { nome, localizacao, capacidade } = req.body;

    if (!nome || !localizacao || !capacidade) {
        return res.status(400).json({
            erro: "Nome, localização e capacidade são obrigatórios"
        });
    }

    try {
        const resultado = db
            .prepare(`
                INSERT INTO laboratorios (nome, localizacao, capacidade)
                VALUES (?, ?, ?)
            `)
            .run(nome, localizacao, capacidade);

        const laboratorio = db
            .prepare("SELECT * FROM laboratorios WHERE id = ?")
            .get(resultado.lastInsertRowid);

        res.status(201).json(laboratorio);
    } catch (erro) {
        res.status(400).json({
            erro: "Não foi possível criar o laboratório"
        });
    }
}

function atualizarLaboratorio(req, res) {
    const { id } = req.params;
    const { nome, localizacao, capacidade } = req.body;

    if (!nome || !localizacao || !capacidade) {
        return res.status(400).json({
            erro: "Nome, localização e capacidade são obrigatórios"
        });
    }

    const laboratorioExistente = db
        .prepare("SELECT * FROM laboratorios WHERE id = ?")
        .get(id);

    if (!laboratorioExistente) {
        return res.status(404).json({
            erro: "Laboratório não encontrado"
        });
    }

    try {
        db.prepare(`
            UPDATE laboratorios
            SET nome = ?, localizacao = ?, capacidade = ?
            WHERE id = ?
        `).run(nome, localizacao, capacidade, id);

        const laboratorioAtualizado = db
            .prepare("SELECT * FROM laboratorios WHERE id = ?")
            .get(id);

        res.json(laboratorioAtualizado);
    } catch (erro) {
        res.status(400).json({
            erro: "Não foi possível atualizar o laboratório"
        });
    }
}

function deletarLaboratorio(req, res) {
    const { id } = req.params;

    const resultado = db
        .prepare("DELETE FROM laboratorios WHERE id = ?")
        .run(id);

    if (resultado.changes === 0) {
        return res.status(404).json({
            erro: "Laboratório não encontrado"
        });
    }

    res.status(204).send();
}

module.exports = {
    listarLaboratorios,
    buscarLaboratorio,
    criarLaboratorio,
    atualizarLaboratorio,
    deletarLaboratorio
};