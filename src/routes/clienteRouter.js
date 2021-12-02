const express = require("express");
const clienteRouter = express.Router();
const clienteController = require("../controllers/clienteController");
const auth = require("../middlewares/auth_motoboy");
const validator = require("../middlewares/clienteValidator");

clienteRouter.get("/listarTodos", auth, clienteController.listarTodos);
clienteRouter.post("/buscarCNPJ", auth, clienteController.listarClienteCNPJ);
clienteRouter.post("/buscarID", auth, clienteController.listarClienteID);
clienteRouter.post("/novo", auth, validator, clienteController.novoCliente);
clienteRouter.delete("/deletar/:id", auth, clienteController.excluirCliente);
clienteRouter.put("/atualizar", auth, validator, clienteController.atualizarCliente);

module.exports = clienteRouter;
