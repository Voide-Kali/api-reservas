const app = require("./app");
const { connectDB } = require("./database/database");

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
