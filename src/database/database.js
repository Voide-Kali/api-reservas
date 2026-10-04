const Database = require("better-sqlite3");
const fs = require("fs");

const db = new Database("src/database/database.sqlite");

db.pragma("foreign_keys = ON");

const schema = fs.readFileSync("src/database/schema.sql", "utf8");

db.exec(schema);

console.log("Banco de dados conectado e tabelas verificadas.");

module.exports = db;