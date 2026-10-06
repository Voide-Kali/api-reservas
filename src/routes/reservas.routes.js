const express = require("express");

const {
    listarReservas,
    buscarReserva,
    criarReserva
} = require("../controllers/reservas.controller");

const router = express.Router();

router.get("/", listarReservas);
router.get("/:id", buscarReserva);
router.post("/", criarReserva);

module.exports = router;