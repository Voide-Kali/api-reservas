CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    perfil TEXT NOT NULL CHECK (perfil IN ('ALUNO', 'PROFESSOR', 'TECNICO'))
);

CREATE TABLE IF NOT EXISTS laboratorios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    localizacao TEXT NOT NULL,
    capacidade INTEGER NOT NULL CHECK (capacidade > 0)
);

CREATE TABLE IF NOT EXISTS equipamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    quantidade INTEGER NOT NULL CHECK (quantidade > 0)
);

CREATE TABLE IF NOT EXISTS reservas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    usuario_id INTEGER NOT NULL,
    laboratorio_id INTEGER,
    equipamento_id INTEGER,

    inicio TEXT NOT NULL,
    fim TEXT NOT NULL,

    status TEXT NOT NULL DEFAULT 'PENDENTE'
        CHECK (status IN ('PENDENTE', 'APROVADA', 'RECUSADA', 'CANCELADA')),

    motivo TEXT,

    aprovado_por INTEGER,

    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (laboratorio_id) REFERENCES laboratorios(id),
    FOREIGN KEY (equipamento_id) REFERENCES equipamentos(id),
    FOREIGN KEY (aprovado_por) REFERENCES usuarios(id),

    CHECK (laboratorio_id IS NOT NULL OR equipamento_id IS NOT NULL),
    CHECK (inicio < fim)
);