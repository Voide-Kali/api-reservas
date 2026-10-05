const express = require("express");

const {
    listarLaboratorios,
    buscarLaboratorio,
    criarLaboratorio,
    atualizarLaboratorio,
    deletarLaboratorio
} = require("../controllers/laboratorios.controller");

const router = express.Router();

router.get("/", listarLaboratorios);
router.get("/:id", buscarLaboratorio);
router.post("/", criarLaboratorio);
router.put("/:id", atualizarLaboratorio);
router.delete("/:id", deletarLaboratorio);

module.exports = router;