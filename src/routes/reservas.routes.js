const express = require("express");
const router = express.Router();
const controller = require("../controllers/reservas.controller");

router.get("/", controller.listarReservas);
router.get("/:id", controller.buscarReserva);
router.post("/", controller.criarReserva);

router.put("/:id/aprovar", controller.aprovarReserva);
router.put("/:id/recusar", controller.recusarReserva);
router.put("/:id/cancelar", controller.cancelarReserva);

module.exports = router;
