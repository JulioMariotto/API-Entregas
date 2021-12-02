const Sequelize = require("sequelize");

class Associado extends Sequelize.Model {
	static init(sequelize) {
		super.init(
			{
				cnpj: Sequelize.STRING,
				nomeEmpresa: Sequelize.STRING,
				senha: Sequelize.STRING,
				endereco: Sequelize.STRING,
			},
			{
				sequelize,
			}
		);
	}

	static associate(models) {
		this.hasMany(models.Cliente, { foreignKey: "associadoId" });
	}
}

module.exports = Associado;
