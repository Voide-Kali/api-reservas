const express = require("express");

const app = express();

app.use(express.json());

const usuariosRoutes = require("./routes/usuarios.routes");

app.use("/usuarios", usuariosRoutes);

app.get("/", (req, res) => {
    res.json({
        mensagem: "API de reservas funcionando"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});