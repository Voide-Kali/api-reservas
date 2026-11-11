const model = require("../models/reservas.model");
const usuarios = require("../models/usuarios.model");
const laboratorios = require("../models/laboratorios.model");
const equipamentos = require("../models/equipamentos.model");
const { converterId } = require("../utils/objectId");

module.exports = {
    listar: () => model.listar(),

    buscar: async (id) => {
        const reserva = await model.buscarPorId(converterId(id));
        if (!reserva) throw new Error("Reserva não encontrada");
        return reserva;
    },

    criar: async (dados) => {
        const { usuario_id, laboratorio_id, equipamento_id, inicio, fim, motivo } = dados;

        if (!usuario_id || !inicio || !fim)
            throw new Error("Usuário, início e fim são obrigatórios");

        if (!laboratorio_id && !equipamento_id)
            throw new Error("Informe um laboratório ou equipamento");

        const dataInicio = new Date(inicio);
        const dataFim = new Date(fim);

        if (isNaN(dataInicio) || isNaN(dataFim) || dataInicio >= dataFim)
            throw new Error("Período inválido");

        const usuarioId = converterId(usuario_id);

        if (!await usuarios.buscarPorId(usuarioId))
            throw new Error("Usuário não encontrado");

        const laboratorioId = laboratorio_id ? converterId(laboratorio_id) : null;
        const equipamentoId = equipamento_id ? converterId(equipamento_id) : null;

        if (laboratorioId && !await laboratorios.buscarPorId(laboratorioId))
            throw new Error("Laboratório não encontrado");

        if (equipamentoId && !await equipamentos.buscarPorId(equipamentoId))
            throw new Error("Equipamento não encontrado");

        const reservas = await model.listar();

        const conflito = reservas.some((r) => {
            if (!["PENDENTE", "APROVADA"].includes(r.status)) return false;

            const sobreposicao =
                dataInicio < new Date(r.fim) && dataFim > new Date(r.inicio);

            const mesmoUsuario = r.usuario_id.equals(usuarioId);
            const mesmoLaboratorio = laboratorioId && r.laboratorio_id?.equals(laboratorioId);
            const mesmoEquipamento = equipamentoId && r.equipamento_id?.equals(equipamentoId);

            return sobreposicao && (mesmoUsuario || mesmoLaboratorio || mesmoEquipamento);
        });

        if (conflito)
            throw new Error("Existe conflito de horário com outra reserva");

        return model.criar({
            usuario_id: usuarioId,
            laboratorio_id: laboratorioId,
            equipamento_id: equipamentoId,
            inicio: dataInicio,
            fim: dataFim,
            motivo: motivo || null,
            status: "PENDENTE",
            aprovado_por: null
        });
    },

    aprovar: async (id, aprovador_id) => {
        const reserva = await module.exports.buscar(id);

        if (reserva.status !== "PENDENTE")
            throw new Error("Somente reservas pendentes podem ser aprovadas");

        const aprovador = await usuarios.buscarPorId(converterId(aprovador_id));

        if (!aprovador)
            throw new Error("Aprovador não encontrado");

        if (!["PROFESSOR", "TECNICO"].includes(aprovador.perfil))
            throw new Error("Somente professores ou técnicos podem aprovar");

        const reservas = await model.listar();

        const conflito = reservas.some((r) => {
            if (r._id.equals(reserva._id) || r.status !== "APROVADA") return false;

            const sobreposicao =
                new Date(reserva.inicio) < new Date(r.fim) &&
                new Date(reserva.fim) > new Date(r.inicio);

            const mesmoLaboratorio =
                reserva.laboratorio_id && r.laboratorio_id?.equals(reserva.laboratorio_id);

            const mesmoEquipamento =
                reserva.equipamento_id && r.equipamento_id?.equals(reserva.equipamento_id);

            return sobreposicao && (mesmoLaboratorio || mesmoEquipamento);
        });

        if (conflito)
            throw new Error("Existe conflito com uma reserva aprovada");

        await model.atualizar(converterId(id), {
            status: "APROVADA",
            aprovado_por: converterId(aprovador_id)
        });

        return module.exports.buscar(id);
    },

    recusar: async (id, aprovador_id) => {
        const reserva = await module.exports.buscar(id);

        if (reserva.status !== "PENDENTE")
            throw new Error("Somente reservas pendentes podem ser recusadas");

        const aprovador = await usuarios.buscarPorId(converterId(aprovador_id));

        if (!aprovador)
            throw new Error("Aprovador não encontrado");

        if (!["PROFESSOR", "TECNICO"].includes(aprovador.perfil))
            throw new Error("Somente professores ou técnicos podem recusar");

        await model.atualizar(converterId(id), {
            status: "RECUSADA",
            aprovado_por: converterId(aprovador_id)
        });

        return module.exports.buscar(id);
    },

    cancelar: async (id) => {
        const reserva = await module.exports.buscar(id);

        if (!["PENDENTE", "APROVADA"].includes(reserva.status))
            throw new Error("Esta reserva não pode ser cancelada");

        await model.atualizar(converterId(id), { status: "CANCELADA" });

        return module.exports.buscar(id);
    }
};
