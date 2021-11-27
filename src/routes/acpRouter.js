const express = require("express");
const acpRouter = express.Router();
const associadoController = require("../controllers/associadoController");
const validator = require("../middlewares/associadoValidator");

acpRouter.get("/listarTodos", associadoController.listarTodos);
acpRouter.post("/buscarCNPJ", associadoController.listarAssociadoCNPJ);
acpRouter.post("/novo", validator, associadoController.novoAssociado);
acpRouter.delete("/deletar/:id", associadoController.excluirAssociado);
acpRouter.put("/atualizar", validator, associadoController.atualizarAssociado);

module.exports = acpRouter;