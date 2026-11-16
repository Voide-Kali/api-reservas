const express = require("express");

const app = express();

app.use(express.json());

app.use("/usuarios", require("./routes/usuarios.routes"));
app.use("/laboratorios", require("./routes/laboratorios.routes"));
app.use("/equipamentos", require("./routes/equipamentos.routes"));
app.use("/reservas", require("./routes/reservas.routes"));

app.get("/", (req, res) => {
    res.json({ mensagem: "API de reservas funcionando" });
});

module.exports = app;
