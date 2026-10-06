const db = require("../database/database");

function listarReservas(req, res) {
    const reservas = db
        .prepare("SELECT * FROM reservas")
        .all();

    res.json(reservas);
}

function buscarReserva(req, res) {
    const { id } = req.params;

    const reserva = db
        .prepare("SELECT * FROM reservas WHERE id = ?")
        .get(id);

    if (!reserva) {
        return res.status(404).json({
            erro: "Reserva não encontrada"
        });
    }

    res.json(reserva);
}

function criarReserva(req, res) {
    const {
        usuario_id,
        laboratorio_id,
        equipamento_id,
        inicio,
        fim,
        motivo
    } = req.body;

    if (!usuario_id || !inicio || !fim) {
        return res.status(400).json({
            erro: "Usuário, início e fim são obrigatórios"
        });
    }

    if (!laboratorio_id && !equipamento_id) {
        return res.status(400).json({
            erro: "Informe um laboratório ou um equipamento"
        });
    }

    if (inicio >= fim) {
        return res.status(400).json({
            erro: "O início deve ser anterior ao fim"
        });
    }

    const usuario = db
        .prepare("SELECT * FROM usuarios WHERE id = ?")
        .get(usuario_id);

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    if (laboratorio_id) {
        const laboratorio = db
            .prepare("SELECT * FROM laboratorios WHERE id = ?")
            .get(laboratorio_id);

        if (!laboratorio) {
            return res.status(404).json({
                erro: "Laboratório não encontrado"
            });
        }
    }

    if (equipamento_id) {
        const equipamento = db
            .prepare("SELECT * FROM equipamentos WHERE id = ?")
            .get(equipamento_id);

        if (!equipamento) {
            return res.status(404).json({
                erro: "Equipamento não encontrado"
            });
        }
    }

    // REGRA 1:
    // Não pode existir outra reserva do mesmo laboratório/equipamento
    // em horário sobreposto.
    const conflitoRecurso = db
        .prepare(`
            SELECT *
            FROM reservas
            WHERE
                (
                    (? IS NOT NULL AND laboratorio_id = ?)
                    OR
                    (? IS NOT NULL AND equipamento_id = ?)
                )
                AND status IN ('PENDENTE', 'APROVADA')
                AND inicio < ?
                AND fim > ?
        `)
        .get(
            laboratorio_id || null,
            laboratorio_id || null,
            equipamento_id || null,
            equipamento_id || null,
            fim,
            inicio
        );

    if (conflitoRecurso) {
        return res.status(409).json({
            erro: "O laboratório ou equipamento já está reservado nesse período"
        });
    }

    // REGRA 2:
    // O mesmo usuário não pode possuir duas reservas
    // em horários sobrepostos.
    const conflitoUsuario = db
        .prepare(`
            SELECT *
            FROM reservas
            WHERE usuario_id = ?
              AND status IN ('PENDENTE', 'APROVADA')
              AND inicio < ?
              AND fim > ?
        `)
        .get(usuario_id, fim, inicio);

    if (conflitoUsuario) {
        return res.status(409).json({
            erro: "O usuário já possui uma reserva nesse período"
        });
    }

    try {
        const resultado = db
            .prepare(`
                INSERT INTO reservas (
                    usuario_id,
                    laboratorio_id,
                    equipamento_id,
                    inicio,
                    fim,
                    motivo
                )
                VALUES (?, ?, ?, ?, ?, ?)
            `)
            .run(
                usuario_id,
                laboratorio_id || null,
                equipamento_id || null,
                inicio,
                fim,
                motivo || null
            );

        const reserva = db
            .prepare("SELECT * FROM reservas WHERE id = ?")
            .get(resultado.lastInsertRowid);

        res.status(201).json(reserva);
    } catch (erro) {
        res.status(400).json({
            erro: "Não foi possível criar a reserva"
        });
    }
}

function aprovarReserva(req, res) {
    const { id } = req.params;
    const { aprovador_id } = req.body;

    if (!aprovador_id) {
        return res.status(400).json({
            erro: "O aprovador_id é obrigatório"
        });
    }

    const reserva = db
        .prepare("SELECT * FROM reservas WHERE id = ?")
        .get(id);

    if (!reserva) {
        return res.status(404).json({
            erro: "Reserva não encontrada"
        });
    }

    if (reserva.status !== "PENDENTE") {
        return res.status(400).json({
            erro: "Somente reservas pendentes podem ser aprovadas"
        });
    }

    const aprovador = db
        .prepare("SELECT * FROM usuarios WHERE id = ?")
        .get(aprovador_id);

    if (!aprovador) {
        return res.status(404).json({
            erro: "Aprovador não encontrado"
        });
    }

    // REGRA 3:
    // Apenas PROFESSOR ou TECNICO pode aprovar.
    if (aprovador.perfil !== "PROFESSOR" && aprovador.perfil !== "TECNICO") {
        return res.status(403).json({
            erro: "Somente professor ou técnico pode aprovar reservas"
        });
    }

    // Verifica novamente se o recurso continua disponível.
    const conflitoRecurso = db
        .prepare(`
            SELECT *
            FROM reservas
            WHERE id != ?
              AND (
                    (laboratorio_id IS NOT NULL AND laboratorio_id = ?)
                    OR
                    (equipamento_id IS NOT NULL AND equipamento_id = ?)
              )
              AND status = 'APROVADA'
              AND inicio < ?
              AND fim > ?
        `)
        .get(
            id,
            reserva.laboratorio_id || null,
            reserva.equipamento_id || null,
            reserva.fim,
            reserva.inicio
        );

    if (conflitoRecurso) {
        return res.status(409).json({
            erro: "Não é possível aprovar: o recurso já está reservado nesse período"
        });
    }

    db.prepare(`
        UPDATE reservas
        SET status = 'APROVADA',
            aprovado_por = ?
        WHERE id = ?
    `).run(aprovador_id, id);

    const reservaAtualizada = db
        .prepare("SELECT * FROM reservas WHERE id = ?")
        .get(id);

    res.json(reservaAtualizada);
}

function recusarReserva(req, res) {
    const { id } = req.params;
    const { aprovador_id } = req.body;

    if (!aprovador_id) {
        return res.status(400).json({
            erro: "O aprovador_id é obrigatório"
        });
    }

    const reserva = db
        .prepare("SELECT * FROM reservas WHERE id = ?")
        .get(id);

    if (!reserva) {
        return res.status(404).json({
            erro: "Reserva não encontrada"
        });
    }

    if (reserva.status !== "PENDENTE") {
        return res.status(400).json({
            erro: "Somente reservas pendentes podem ser recusadas"
        });
    }

    const aprovador = db
        .prepare("SELECT * FROM usuarios WHERE id = ?")
        .get(aprovador_id);

    if (!aprovador) {
        return res.status(404).json({
            erro: "Aprovador não encontrado"
        });
    }

    if (aprovador.perfil !== "PROFESSOR" && aprovador.perfil !== "TECNICO") {
        return res.status(403).json({
            erro: "Somente professor ou técnico pode recusar reservas"
        });
    }

    db.prepare(`
        UPDATE reservas
        SET status = 'RECUSADA',
            aprovado_por = ?
        WHERE id = ?
    `).run(aprovador_id, id);

    const reservaAtualizada = db
        .prepare("SELECT * FROM reservas WHERE id = ?")
        .get(id);

    res.json(reservaAtualizada);
}

function cancelarReserva(req, res) {
    const { id } = req.params;

    const reserva = db
        .prepare("SELECT * FROM reservas WHERE id = ?")
        .get(id);

    if (!reserva) {
        return res.status(404).json({
            erro: "Reserva não encontrada"
        });
    }

    if (
        reserva.status !== "PENDENTE" &&
        reserva.status !== "APROVADA"
    ) {
        return res.status(400).json({
            erro: "Essa reserva não pode ser cancelada"
        });
    }

    db.prepare(`
        UPDATE reservas
        SET status = 'CANCELADA'
        WHERE id = ?
    `).run(id);

    const reservaAtualizada = db
        .prepare("SELECT * FROM reservas WHERE id = ?")
        .get(id);

    res.json(reservaAtualizada);
}

module.exports = {
    listarReservas,
    buscarReserva,
    criarReserva,
    aprovarReserva,
    recusarReserva,
    cancelarReserva
};