'use strict';
const { cnpj } = require("cpf-cnpj-validator");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Associados",
      [
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "MariottoJR Transportes",
          senha: "$2a$12$kXAjuF.B0KUGTRgt1hKM4.ZUcBSefONu2hTb2wsXdYUHHvF/OcAVW",
          endereco: "Rua Maranhão, 415",
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Panelas Araraguaia",
          senha: "$2a$12$kXAjuF.B0KUGTRgt1hKM4.ZUcBSefONu2hTb2wsXdYUHHvF/OcAVW",
          endereco: "Rua Belém, 1313",
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Piscinas Mattias",
          senha: "$2a$12$kXAjuF.B0KUGTRgt1hKM4.ZUcBSefONu2hTb2wsXdYUHHvF/OcAVW",
          endereco: "Rua Piraquara, 45",
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Mercado Bom Sucesso",
          senha: "$2a$12$kXAjuF.B0KUGTRgt1hKM4.ZUcBSefONu2hTb2wsXdYUHHvF/OcAVW",
          endereco: "Rua Terezina, 3030",
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Conservas Ciara",
          senha: "$2a$12$kXAjuF.B0KUGTRgt1hKM4.ZUcBSefONu2hTb2wsXdYUHHvF/OcAVW",
          endereco: "Rua Minas, ",
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Passauna Travesseiros",
          senha: "$2a$12$kXAjuF.B0KUGTRgt1hKM4.ZUcBSefONu2hTb2wsXdYUHHvF/OcAVW",
          endereco: "Rua Natal, 2111",
        },
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Associados", null, {});
  }
};
