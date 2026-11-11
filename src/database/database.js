const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectDB() {
    await client.connect();
    db = client.db(process.env.MONGO_DB);
    console.log("MongoDB conectado com sucesso!");
}

function getDB() {
    if (!db) {
        throw new Error("Banco de dados não conectado");
    }

    return db;
}

module.exports = { connectDB, getDB };
