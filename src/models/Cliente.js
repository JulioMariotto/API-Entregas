const Sequelize = require("sequelize");

class Cliente extends Sequelize.Model {
	static init(sequelize) {
		super.init(
			{
				cnpj: Sequelize.STRING,
				nomeEmpresa: Sequelize.STRING,
				endereco: Sequelize.STRING,
			},
			{
				sequelize,
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.Associado, { foreignKey: "associadoId" });
		this.hasMany(models.Entrega, { foreignKey: "clienteId"});
	}
}

module.exports = Cliente;
