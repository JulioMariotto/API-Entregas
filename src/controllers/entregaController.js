const Entrega = require("../models/Entrega");
const Sequelize = require("sequelize");

module.exports = {

	async listarTodos(req, res) {

		const entregas = await Entrega.findAll({
			order: [["status", "ASC"]],
		}).catch((error) => {
			res.status(500).json({ msg: "Falha na conexão." });
		});
		if (entregas) 
			return res.status(200).json({ entregas });
		else 
			return res.status(404).json({ msg: "Não foi possível listar as entregas." });
	},
	async listarTodosMotoboy(req, res) {

		const id = req.params.id;
		const entregas = await Entrega.findAll({
			where: {motoboyId: id},
		}).catch((error) => {
			res.status(500).json({ msg: error });
		});
		if (entregas) 
			return res.status(200).json({ entregas });
		else 
			return res.status(404).json({ msg: "Não foi possível listar as entregas." });
	},
	async listarTodosRealizadas(req, res) {

		const entregas = await Entrega.findAll({
			where: {status: "Realizada"},
		}).catch((error) => {
			res.status(500).json({ msg: "Falha na conexão." });
		});
		if (entregas) res.status(200).json({ entregas });
		else res.status(404).json({ msg: "Não foi possível listar as entregas." });
	},
	async listarTodosPendentes(req, res) {

		const entregas = await Entrega.findAll({
			where: {status: "Pendente"},
		}).catch((error) => {
			res.status(500).json({ msg: "Falha na conexão." });
		});
		if (entregas) res.status(200).json({ entregas });
		else res.status(404).json({ msg: "Não foi possível listar as entregas." });
	},
	async listarRealizadasMotoboy(req, res) {

		const motoboyId = req.params.id;
		const entregas = await Entrega.findAll({
			where: {
				status: "Realizada",
				motoboyId
			},
		}).catch((error) => {
			res.status(500).json({ msg: "Falha na conexão." });
		});
		if (entregas) res.status(200).json({ entregas });
		else res.status(404).json({ msg: "Não foi possível listar as entregas." });
	},
	async listarPendentesMotoboy(req, res) {

		const motoboyId = req.params.id;
		const entregas = await Entrega.findAll({
			where: {
				status: "Pendente",
				motoboyId
			},
		}).catch((error) => {
			res.status(500).json({ msg: "Falha na conexão." });
		});
		if (entregas) res.status(200).json({ entregas });
		else res.status(404).json({ msg: "Não foi possível listar as entregas." });
	},
	async atualizarEntrega(req, res) {
	
		const id = req.body.id;
		const entrega = req.body;
		const existe = await Entrega.findByPk(id);
		if (!existe)
			return res.status(404).json({ msg: "Entrega não localizada." });
		else {
			if(existe.status === "Realizada")
				return res.status(400).json({ msg: "Entrega não pode ser atualizada pois já foi Realizada."})
			if (entrega.descricao || entrega.status || entrega.valor) {
				await Entrega.update(entrega, {
					where: { id },
				});
				return res.status(200).json({ msg: "Entrega atualizada com sucesso." });
			} else
				return res.status(400).json({ msg: "Campos obrigatórios não preenchidos." });
		}
	},
	async novaEntrega(req, res) {
	
			const { descricao, clienteId} = req.body;
			
				const entrega = await Entrega.create({
					descricao,
					status: 'Pendente',
					clienteId
				});
				if(entrega)
					res.status(201).json({ msg: "Entrega adicionada." });
				else
					res.status(404).json({ msg: "Não foi possível adicionar a entrega." });
			
	},
	async excluirEntrega(req, res) {

		const id = req.params.id;
		const existe = await Entrega.findByPk(id);
		if (!existe)
			return res.status(404).json({ msg: "Entrega não localizada." });
		else {
			if(existe.status === "Realizada")
				return res.status(400).json({ msg: "Entrega não pode ser removida pois já foi Realizada."})
			else {
				await Entrega.destroy({
					where: { id: id },
				}).catch(async (error) => {
					
					return res.status(500).json({ msg: error.details });
					
				});
				return res.status(200).json({ msg: "Entrega excluida com sucesso." });
			} 
		}

	},
};
