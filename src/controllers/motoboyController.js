const Motoboy = require("../models/Motoboy");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");

function geraToken(id) {
	console.log(process.env.JWT_SECRET);
	process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
	console.log(process.env.JWT_SECRET);
	const token = jwt.sign({id}, process.env.JWT_SECRET, {
		expiresIn: 86400,
	});
	console.log(token);
	return token;
}

module.exports = {

	async login (req, res) {
		try{

			const {cpf, senha} = req.body;
			const motoboy = await Motoboy.findOne({
				where: {cpf},
			});
			if(!motoboy)
				return res.status(400).json({ msg: "CPF ou senha inválidos." });
			else{
				if(bcrypt.compareSync(senha, motoboy.senha)){
					const token = geraToken(Motoboy.id);
					return res.status(200).json({ msg: "Login efetuado com sucesso.", token });
				}
				else
					return res.status(400).json({ msg: "CPF ou senha inválidos." });
			}
		}
		catch(error) {
			res.status(500).json({ msg: error.message});
		}
	},

	async listarTodos(req, res) {
		const motoboy = await Motoboy.findAll({
			order: [["nome", "ASC"]],
		}).catch((error) => {
			res.status(500).json({ msg: "Falha na conexão." });
		});
		if (motoboy)
			if (motoboy == "")
				res.status(404).json({ msg: "Não foi possível localizar os motoboys." });
			else res.status(200).json({ motoboys: motoboy });
		else
			res.status(404).json({ msg: "Não foi possível localizar os motoboys." });
	},

	async listarMotoboyCPF(req, res) {
		const cpf = req.body.cpf;
		const Op = Sequelize.Op;
		const motoboy = await Motoboy.findAll({
			where: { cpf: { [Op.like]: "%" + cpf + "%" } },
		});
		if (motoboy) {
			if (motoboy == "")
				res.status(404).json({ msg: "Motoboy não localizado." });
			else res.status(200).json({ motoboy: motoboy });
		} else
			res.status(404).json({
				msg: "Motoboy não localizado.",
			});
	},

	async novoMotoboy(req, res) {
		
		try{

			const { cpf, nome, senha, telefone} = req.body;
			const motoboyNovo = await Motoboy.findOne({
				where: { cpf },
			});

			if (motoboyNovo)
				res.status(403).json({ msg: "Motoboy já cadastrado." });
			else {
				const salt = bcrypt.genSaltSync(12);
				const hash = bcrypt.hashSync(senha, salt);

				const motoboy = await Motoboy.create({
					cpf,
					nome,
					senha: hash,
					telefone
				});
				if(motoboy)
					res.status(201).json({ msg: "Motoboy adicionado." });
				else
					res.status(404).json({ msg: "Não foi possível adicionar o motoboy." });
			}
		} catch(error) {
			res.status(500).json({ msg: "Não foi possível adicionar o motoboy." });
		};
		
		
	},

	async excluirMotoboy(req, res) {
		const motoboyId = req.params.id;
		const excluir = await Motoboy.destroy({
			where: { id: motoboyId },
		}).catch(async (error) => {
			
			return res.status(500).json({ msg: error.details });
			
		});
		if (excluir != 0)
			res.status(200).json({ msg: "Motoboy excluido com sucesso." });
		else res.status(404).json({ msg: "Motoboy não localizado." });
	},
	async relatorio(req, res) {
		
		const motoboyId = req.params.id;
		var total = 0;
		total =  await Entrega.sum( 'valor', {
				where: { motoboyId}
		});

		if (total > 0) {
			res.status(200).json({
				total: total.toLocaleString("pt-br",{style: "currency", currency: "BRL"}),
				receber: (total * 0.7).toLocaleString("pt-br",{style: "currency", currency: "BRL"})
			});
		} else
			res.status(404).json({
				msg: "Sem entregas realizadas.",
			});
	},
	async atualizarMotoboy(req, res) {
	
		const motoboyId = req.params.id;
		const motoboy = req.body;
		const existe = await Motoboy.findByPk(motoboyId);
		if (!existe)
			res.status(404).json({ msg: "Motoboy não localizado." });
		else {
			motoboy.senha = existe.senha;
			if (motoboy.cpf || motoboy.nome || motoboy.telefone) {
				await Motoboy.update(motoboy, {
					where: { id: motoboyId },
				});
				return res.status(200).json({ msg: "Motoboy atualizado com sucesso." });
			} else
				return res.status(400).json({ msg: "Campos obrigatórios não preenchidos." });
		}
	},
};
