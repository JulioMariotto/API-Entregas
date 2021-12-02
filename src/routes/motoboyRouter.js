const express = require("express");
const motoboyRouter = express.Router();
const motoboyController = require("../controllers/motoboyController");
const entregaController = require("../controllers/entregaController");
const auth = require("../middlewares/auth_motoboy");
const validator = require("../middlewares/motoboyValidator");

motoboyRouter.post("/login", validator, motoboyController.login);
motoboyRouter.get("/:id/entregas/realizadas", auth, entregaController.listarRealizadasMotoboy);
motoboyRouter.get("/:id/entregas/pendentes", auth, entregaController.listarPendentesMotoboy);
motoboyRouter.get("/:id/entregas", auth, entregaController.listarTodosMotoboy);
motoboyRouter.put("/:id/entregas/confirmar/", auth, entregaController.atualizarEntrega);
motoboyRouter.get("/:id/relatorio", auth, motoboyController.relatorio);

module.exports = motoboyRouter;
