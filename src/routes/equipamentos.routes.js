const express = require("express");

const {
    listarEquipamentos,
    buscarEquipamento,
    criarEquipamento,
    atualizarEquipamento,
    deletarEquipamento
} = require("../controllers/equipamentos.controller");

const router = express.Router();

router.get("/", listarEquipamentos);

router.get("/:id", buscarEquipamento);

router.post("/", criarEquipamento);

router.put("/:id", atualizarEquipamento);

router.delete("/:id", deletarEquipamento);

module.exports = router;