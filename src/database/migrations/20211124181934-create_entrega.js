'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Entregas', { 
      	id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
      	},
      	descricao: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		status: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: 'Pendente',
		},
		valor: {
			type: Sequelize.FLOAT,
			allowNull: true,
      	},
      	clienteId: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: { model: "Clientes", key: "id" },
			onUpdate: "SET NULL",
			onDelete: "SET NULL",
		},
      	motoboyId: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: { model: "Motoboys", key: "id" },
			onUpdate: "SET NULL",
			onDelete: "SET NULL",
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
		},
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Entregas');
  }
};
