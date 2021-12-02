const Associado = require("../models/Associado");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const Cliente = require("../models/Cliente");
const Entrega = require("../models/Entrega");
const { sequelize } = require("../models/Associado");
const Motoboy = require("../models/Motoboy");


function geraToken(id) {
	console.log(process.env.JWT_SECRET_NV1);
	process.env.JWT_SECRET_NV1 = Math.random().toString(36).slice(-20);
	console.log(process.env.JWT_SECRET_NV1);
	const token = jwt.sign({id}, process.env.JWT_SECRET_NV1, {
		expiresIn: 86400,
	});
	console.log(token);
	return token;
}

module.exports = {

	async login (req, res) {
		try{

			const {cnpj, senha} = req.body;
			const associado = await Associado.findOne({
				where: {cnpj},
			});
			if(!associado)
				return res.status(400).json({ msg: "CNPJ ou senha inválidos." });
			else{
				if(bcrypt.compareSync(senha, associado.senha)){
					const token = geraToken(Associado.id);
					return res.status(200).json({ msg: "Login efetuado com sucesso.", token });
				}
				else
					return res.status(400).json({ msg: "CNPJ ou senha inválidos." });
			}
		}
		catch(error) {
			res.status(500).json({ msg: error.message});
		}
	},

	async listarTodos(req, res) {
		const associado = await Associado.findAll({
			order: [["nomeEmpresa", "ASC"]],
		}).catch((error) => {
			res.status(500).json({ msg: "Falha na conexão." });
		});
		if (associado)
			if (associado == "")
				res.status(404).json({ msg: "Não foi possível localizar os associados." });
			else res.status(200).json({ associados: associado });
		else
			res.status(404).json({ msg: "Não foi possível localizar os associados." });
	},

	async listarAssociadoCNPJ(req, res) {
		const cnpj = req.body.cnpj;
		const Op = Sequelize.Op;
		const associado = await Associado.findAll({
			where: { cnpj: { [Op.like]: "%" + cnpj + "%" } },
		});
		if (associado) {
			if (associado == "")
				res.status(404).json({ msg: "Associado não localizado." });
			else res.status(200).json({ associado: associado });
		} else
			res.status(404).json({
				msg: "Associado não localizado.",
			});
	},

	async relatorioAdm(req, res) {
		const id = req.body.id;

		const clientes = await Cliente.findAll({
			where: { associadoId: id },
		});

		const motoboys = await Motoboy.count();
		
		var count = 0, realizadas = 0, pendentes = 0;
		
		for(c in clientes){
			
			count = count + await Entrega.count({
				where: { clienteId: clientes[c].id}
			});
			console.log(count);
			realizadas = realizadas + await Entrega.count({
				where: { 
					clienteId: clientes[c].id,
					status: 'Realizada'
				}
			});
			
			pendentes = pendentes + await Entrega.count({
				where: { 
					clienteId: clientes[c].id,
					status: 'Pendente'
				}
			});
		}

		const top_clientes = await Cliente.findAll({
			attributes: [
				'id',
				['nomeEmpresa', 'nome'],
				Sequelize.literal('count(entregas.id) as numero_entregas')
			],
			include: [{
				model: Entrega,
				attributes: [
						Sequelize.literal('count(entregas.id) as numero_entregas')
					]
				
			}],
			where: { associadoId: id},
			
			group: Sequelize.literal('nome order by numero_entregas DESC limit 5')
		});

		const top_motoboys = await Motoboy.findAll({
			attributes: [
				'id',
				'nome',
				Sequelize.literal('count(entregas.id) as numero_entregas')
			],
			include: [{
				model: Entrega,
				attributes: [
						Sequelize.literal('count(entregas.id) as numero_entregas')
					]
				
			}],
			group: Sequelize.literal('nome order by numero_entregas DESC limit 5')
		});

		if (top_clientes || clientes) {
			res.status(200).json({
				clientes: clientes.length,
				motoboys: motoboys,
				top_clientes: top_clientes,
				top_motoboys: top_motoboys,
				entregas: count,
				realizadas: ((realizadas/count)*100) + " % (" + realizadas + ")",
				pendentes: ((pendentes/count)*100) + " % (" + pendentes + ")"
			 });
		} else
			res.status(404).json({
				msg: "Associado não localizado.",
			});
	},

	async relatorioFin(req, res) {
		
		const id = req.body.id;
		const clientes = await Cliente.findAll({
			where: { associadoId: id },
		});
		var count = 0;
		for(c in clientes){
			count = count + await Entrega.sum( 'valor', {
				where: { clienteId: clientes[c].id}
			});
		}

		if (count > 0) {
			res.status(200).json({
				total: count.toLocaleString("pt-br",{style: "currency", currency: "BRL"}),
				associado: (count * 0.3).toLocaleString("pt-br",{style: "currency", currency: "BRL"}),
				motoboy: (count * 0.7).toLocaleString("pt-br",{style: "currency", currency: "BRL"})
			});
		} else
			res.status(404).json({
				msg: "Associado não localizado.",
			});
	},

	async novoAssociado(req, res) {
		try{

			const { cnpj, nomeEmpresa, senha, endereco} = req.body;
			console.log(endereco);
			const associadoNovo = await Associado.findOne({
				where: { cnpj },
			});

			if (associadoNovo)
				res.status(403).json({ msg: "Associado já cadastrado." });
			else {
				const salt = bcrypt.genSaltSync(12);
				const hash = bcrypt.hashSync(senha, salt);

				const associado = await Associado.create({
					cnpj,
					nomeEmpresa,
					senha: hash,
					endereco
				});
				if(associado)
					res.status(201).json({ msg: "Associado adicionado." });
				else
					res.status(404).json({ msg: "Não foi possível adicionar o associado." });
			}
		} catch(error) {
			res.status(500).json({ msg: "Não foi possível adicionar o associado." });
		};
		
		
	},

	async excluirAssociado(req, res) {
		const associadoId = req.params.id;
		const excluir = await Associado.destroy({
			where: { id: associadoId },
		}).catch(async (error) => {
			
			return res.status(500).json({ msg: error.details });		
			
		});
		if (excluir != 0)
			res.status(200).json({ msg: "Associado excluido com sucesso." });
		else res.status(404).json({ msg: "Associado não localizado." });
	},
	
	async atualizarAssociado(req, res) {
	
		const associadoId = req.body.id;
		const associado = req.body;
		const existe = await Associado.findByPk(associadoId);
		if (!existe)
			res.status(404).json({ msg: "Associado não localizado." });
		else {
			
			if(associado.senha){
				const salt = bcrypt.genSaltSync(12);
				const hash = bcrypt.hashSync(associado.senha, salt);
				associado.senha = hash;
			}
			else{
				associado.senha = existe.senha;
			}

			if (associado.cnpj || associado.nomeEmpresa) {
				await Associado.update(associado, {
					where: { id: associadoId },
				});
				return res.status(200).json({ msg: "Associado atualizado com sucesso." });
			} else {
				return res.status(400).json({ msg: "Campos obrigatórios não preenchidos." });
			}
		}
	},
};
