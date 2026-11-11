const express = require("express");
const { connectDB } = require("./database/database");

const app = express();

app.use(express.json());

app.use("/usuarios", require("./routes/usuarios.routes"));
app.use("/laboratorios", require("./routes/laboratorios.routes"));
app.use("/equipamentos", require("./routes/equipamentos.routes"));
app.use("/reservas", require("./routes/reservas.routes"));

app.get("/", (req, res) => {
    res.json({ mensagem: "API de reservas funcionando" });
});

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch((erro) => {
        console.error("Erro ao conectar ao MongoDB:", erro);
        process.exit(1);
    });
