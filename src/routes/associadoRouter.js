const express = require("express");
const associadoRouter = express.Router();
const associadoController = require("../controllers/associadoController");
const clienteController = require("../controllers/clienteController");
const motoboyController = require("../controllers/motoboyController");
const entregaController = require("../controllers/entregaController");
const auth = require("../middlewares/auth_motoboy");
const validator = require("../middlewares/associadoValidator");

associadoRouter.post("/login", validator, associadoController.login);
associadoRouter.post("/buscarCNPJ", auth, associadoController.listarAssociadoCNPJ);
associadoRouter.put("/atualizar/", auth, validator, associadoController.atualizarAssociado);
associadoRouter.post("/relatorio/administrativo", auth, associadoController.relatorioAdm);
associadoRouter.post("/relatorio/financeiro", auth, associadoController.relatorioFin);
associadoRouter.post("/cliente/novo", auth, validator, clienteController.novoCliente);
associadoRouter.delete("/cliente/deletar/:id", auth, clienteController.excluirCliente);
associadoRouter.put("/cliente/atualizar", auth, validator, clienteController.atualizarCliente);
associadoRouter.post("/motoboy/novo", auth, validator, motoboyController.novoMotoboy);
associadoRouter.delete("/motoboy/deletar/:id",  auth, motoboyController.excluirMotoboy);
associadoRouter.put("/motoboy/atualizar/:id",  auth, validator, motoboyController.atualizarMotoboy);
associadoRouter.post("/entrega/novo", auth, entregaController.novaEntrega);
associadoRouter.put("/entrega/atualizar" , auth, entregaController.atualizarEntrega);
associadoRouter.delete("/entrega/deletar/:id", auth, entregaController.excluirEntrega);

module.exports = associadoRouter;
