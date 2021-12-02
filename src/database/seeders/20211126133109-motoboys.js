'use strict';
const { cpf } = require("cpf-cnpj-validator");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Motoboys",
      [
        {
          nome: "Luis Gustavo",
          cpf: cpf.generate(true),
          senha: "$2a$12$kXAjuF.B0KUGTRgt1hKM4.ZUcBSefONu2hTb2wsXdYUHHvF/OcAVW",
          telefone: "(41) 99515-9723",
        },
        {
          nome: "Zé Ivaldo",
          cpf: cpf.generate(true),
          senha: "$2a$12$kXAjuF.B0KUGTRgt1hKM4.ZUcBSefONu2hTb2wsXdYUHHvF/OcAVW",
          telefone: "(41) 99223-8997",
        },
        {
          nome: "Mateus Babi",
          cpf: cpf.generate(true),
          senha: "$2a$12$kXAjuF.B0KUGTRgt1hKM4.ZUcBSefONu2hTb2wsXdYUHHvF/OcAVW",
          telefone: "(41) 98876-5009",
        },
        {
          nome: "David Terans",
          cpf: cpf.generate(true),
          senha: "$2a$12$kXAjuF.B0KUGTRgt1hKM4.ZUcBSefONu2hTb2wsXdYUHHvF/OcAVW",
          telefone: "(41) 99515-9723",
        },
        {
          nome: "Thiago H.",
          cpf: cpf.generate(true),
          senha: "$2a$12$kXAjuF.B0KUGTRgt1hKM4.ZUcBSefONu2hTb2wsXdYUHHvF/OcAVW",
          telefone: "(41) 99223-8997",
        },
        {
          nome: "Pedro Rocha",
          cpf: cpf.generate(true),
          senha: "$2a$12$kXAjuF.B0KUGTRgt1hKM4.ZUcBSefONu2hTb2wsXdYUHHvF/OcAVW",
          telefone: "(41) 98876-5009",
        },
        {
          nome: "Renato K.",
          cpf: cpf.generate(true),
          senha: "$2a$12$kXAjuF.B0KUGTRgt1hKM4.ZUcBSefONu2hTb2wsXdYUHHvF/OcAVW",
          telefone: "(41) 99515-9723",
        },
        {
          nome: "Abner V.",
          cpf: cpf.generate(true),
          senha: "$2a$12$kXAjuF.B0KUGTRgt1hKM4.ZUcBSefONu2hTb2wsXdYUHHvF/OcAVW",
          telefone: "(41) 99223-8997",
        },
        {
          nome: "Pedro Henrique",
          cpf: cpf.generate(true),
          senha: "$2a$12$kXAjuF.B0KUGTRgt1hKM4.ZUcBSefONu2hTb2wsXdYUHHvF/OcAVW",
          telefone: "(41) 98876-5009",
        },
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Motoboys", null, {});
  }
};
