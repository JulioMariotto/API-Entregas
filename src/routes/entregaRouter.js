const express = require("express");
const entregaRouter = express.Router();
const entregaController = require("../controllers/entregaController");
const auth = require("../middlewares/auth_motoboy");

entregaRouter.get("/listarTodas", auth, entregaController.listarTodos);
entregaRouter.get("/listarTodas/realizadas", auth, entregaController.listarTodosRealizadas);
entregaRouter.get("/listarTodas/pendentes", auth, entregaController.listarTodosPendentes);
entregaRouter.get("/listarTodas/motoboy/:id", auth, entregaController.listarTodosMotoboy);
entregaRouter.post("/novo", auth, entregaController.novaEntrega);
entregaRouter.put("/atualizar" , auth, entregaController.atualizarEntrega);
entregaRouter.delete("/deletar/:id", auth, entregaController.excluirEntrega);

module.exports = entregaRouter;
