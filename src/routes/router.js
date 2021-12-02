const express = require("express");
const acpRouter = require("./acpRouter");
const associadoRouter = require("./associadoRouter");
const clienteRouter = require("./clienteRouter");
const motoboyRouter = require("./motoboyRouter");
const entregaRouter = require("./entregaRouter");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("OK");
});

router.use("/acp", acpRouter);
router.use("/associado", associadoRouter);
router.use("/cliente", clienteRouter);
router.use("/motoboy", motoboyRouter);
router.use("/entrega", entregaRouter);

module.exports = router;
