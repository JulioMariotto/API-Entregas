const Cliente = require("../models/Cliente");
const Entrega = require("../models/Entrega");
const Sequelize = require("sequelize");
const Associado = require("../models/Associado");

module.exports = {

	
	async listarTodos(req, res) {
		const clientes = await Cliente.findAll({
			order: [["nomeEmpresa", "ASC"]],
		}).catch((error) => {
			res.status(500).json({ msg: "Falha na conexão." });
		});
		if (clientes)
			if (clientes == "")
				res.status(404).json({ msg: "Não foi possível localizar os clientes." });
			else res.status(200).json({ clientes: clientes });
		else
			res.status(404).json({ msg: "Não foi possível localizar os clientes." });
	},

	async listarClienteCNPJ(req, res) {
		const cnpj = req.body.cnpj;
		const Op = Sequelize.Op;
		const cliente = await Cliente.findAll({
			where: { cnpj: { [Op.like]: "%" + cnpj + "%" } },
		});
		if (cliente) {
			if (cliente == "")
				res.status(404).json({ msg: "Cliente não localizado." });
			else res.status(200).json({ clientes: cliente });
		} else
			res.status(404).json({
				msg: "Cliente não localizado.",
			});
	},

	async listarClienteID(req, res) {
		const associadoId = req.body.associadoId;
		const cliente = await Cliente.findAll({
			where: { associadoId}
		});
		if (cliente) {
			if (cliente == "")
				res.status(404).json({ msg: "Cliente não localizado." });
			else res.status(200).json({ cliente: cliente });
		} else
			res.status(404).json({
				msg: "Cliente não localizado.",
			});
	},

	async novoCliente(req, res) {
		
		try{

			const { cnpj, nomeEmpresa, endereco, associadoId} = req.body;
			const clienteNovo = await Cliente.findOne({
				where: { cnpj },
			});

			const existe = await Associado.findByPk(associadoId);

			if (clienteNovo)
				res.status(403).json({ msg: "Cliente já cadastrado." });
			if (!existe)
				res.status(403).json({ msg: "Associado não existe." });
			else {
				
				const cliente = await Cliente.create({
					cnpj,
					nomeEmpresa,
					endereco,
					associadoId,
				});
				if(cliente)
					res.status(201).json({ msg: "Cliente adicionado." });
				else
					res.status(404).json({ msg: "Não foi possível adicionar o cliente." });
			}
		} catch(error) {
		res.status(500).json({ msg: "Não foi possível adicionar o cliente." });
	};
		
		
	},

	async excluirCliente(req, res) {
		const clienteId = req.params.id;
		const excluir = await Cliente.destroy({
			where: { id: clienteId },
		}).catch(async (error) => {
			return res.status(500).json({ msg: error.details });
		});
		if (excluir != 0)
			res.status(200).json({ msg: "Cliente excluido com sucesso." });
		else res.status(404).json({ msg: "Cliente não localizado." });
	},
	
	async atualizarCliente(req, res) {
	
		const clienteId = req.body.id;
		const cliente = req.body;
		const existe = await Cliente.findByPk(clienteId);
		if (!existe)
			res.status(404).json({ msg: "Cliente não encontrado." });
		else {
			cliente.associadoId = existe.associadoId;
			if (cliente.cnpj || cliente.nomeEmpresa) {
				await Cliente.update(cliente, {
					where: { id: clienteId },
				});
				return res.status(200).json({ msg: "Cliente atualizado com sucesso." });
			} else
				return res.status(400).json({ msg: "Campos obrigatórios não preenchidos." });
		}
	},
};
