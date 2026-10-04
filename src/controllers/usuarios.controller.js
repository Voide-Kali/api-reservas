const db = require("../database/database");

function listarUsuarios(req, res) {
    const usuarios = db
        .prepare("SELECT * FROM usuarios")
        .all();

    res.json(usuarios);
}

function buscarUsuario(req, res) {
    const { id } = req.params;

    const usuario = db
        .prepare("SELECT * FROM usuarios WHERE id = ?")
        .get(id);

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.json(usuario);
}

function criarUsuario(req, res) {
    const { nome, email, perfil } = req.body;

    if (!nome || !email || !perfil) {
        return res.status(400).json({
            erro: "Nome, email e perfil são obrigatórios"
        });
    }

    try {
        const resultado = db
            .prepare(`
                INSERT INTO usuarios (nome, email, perfil)
                VALUES (?, ?, ?)
            `)
            .run(nome, email, perfil);

        const usuario = db
            .prepare("SELECT * FROM usuarios WHERE id = ?")
            .get(resultado.lastInsertRowid);

        res.status(201).json(usuario);
    } catch (erro) {
        res.status(400).json({
            erro: "Não foi possível criar o usuário"
        });
    }
}

function atualizarUsuario(req, res) {
    const { id } = req.params;
    const { nome, email, perfil } = req.body;

    if (!nome || !email || !perfil) {
        return res.status(400).json({
            erro: "Nome, email e perfil são obrigatórios"
        });
    }

    const usuarioExistente = db
        .prepare("SELECT * FROM usuarios WHERE id = ?")
        .get(id);

    if (!usuarioExistente) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    try {
        db.prepare(`
            UPDATE usuarios
            SET nome = ?, email = ?, perfil = ?
            WHERE id = ?
        `).run(nome, email, perfil, id);

        const usuarioAtualizado = db
            .prepare("SELECT * FROM usuarios WHERE id = ?")
            .get(id);

        res.json(usuarioAtualizado);
    } catch (erro) {
        res.status(400).json({
            erro: "Não foi possível atualizar o usuário"
        });
    }
}

function deletarUsuario(req, res) {
    const { id } = req.params;

    const resultado = db
        .prepare("DELETE FROM usuarios WHERE id = ?")
        .run(id);

    if (resultado.changes === 0) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.status(204).send();
}

module.exports = {
    listarUsuarios,
    buscarUsuario,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};