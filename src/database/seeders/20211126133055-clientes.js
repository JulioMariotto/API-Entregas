'use strict';
const { cnpj } = require("cpf-cnpj-validator");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Clientes",
      [
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Zé Pneus",
          endereco: "Rua Cuiabá, 415",
          associadoId: 1,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Auto Peças Lima",
          endereco: "Rua Salvador, 2113",
          associadoId: 2,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Magu Lanches",
          endereco: "Rua Leopoldo, 15",
          associadoId: 3,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Mercado Bom Sucesso",
          endereco: "Rua Terezina, 3030",
          associadoId: 4,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Conservas Ciara",
          endereco: "Rua Minas, ",
          associadoId: 5,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Baterias Caixão",
          endereco: "Rua São Luis, 1111",
          associadoId: 6,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Canuda Garcia",
          endereco: "Rua São Paulo, 123",
          associadoId: 1,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Maria Penhores",
          endereco: "Rua Rio de Janeiro, 889",
          associadoId: 2,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Pedro Motos",
          endereco: "Rua Conservadores, 200",
          associadoId: 3,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Frutas Julia",
          endereco: "Rua Palmeiras, 120",
          associadoId: 4,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Tecidos Marajá",
          endereco: "Rua Tocantins, 112",
          associadoId: 5,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Mauro Pipas",
          endereco: "Rua Nazaré, 2828",
          associadoId: 6,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Canudos Garcia",
          endereco: "Rua São Paulo, 123",
          associadoId: 1,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Maria Joias",
          endereco: "Rua Rio de Janeiro, 889",
          associadoId: 2,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Pedro Bicicletas",
          endereco: "Rua Conservadores, 200",
          associadoId: 3,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Sabão Julia",
          endereco: "Rua Palmeiras, 120",
          associadoId: 4,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Esfirras Marajá",
          endereco: "Rua Tocantins, 112",
          associadoId: 5,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Mauro Canos",
          endereco: "Rua Nazaré, 2828",
          associadoId: 6,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Copos Garcia",
          endereco: "Rua São Paulo, 123",
          associadoId: 1,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Maria Cristais",
          endereco: "Rua Rio de Janeiro, 889",
          associadoId: 2,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Pedro Mecânico",
          endereco: "Rua Conservadores, 200",
          associadoId: 3,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Floricultura da Julia",
          endereco: "Rua Palmeiras, 120",
          associadoId: 4,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "CDs Marajá",
          endereco: "Rua Tocantins, 112",
          associadoId: 5,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Mauro Fogos",
          endereco: "Rua Nazaré, 2828",
          associadoId: 6,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Viação Garcia",
          endereco: "Rua São Paulo, 123",
          associadoId: 1,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Maria Faxineira",
          endereco: "Rua Rio de Janeiro, 889",
          associadoId: 2,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Pedro Esports",
          endereco: "Rua Conservadores, 200",
          associadoId: 3,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Espetinho Julia",
          endereco: "Rua Palmeiras, 120",
          associadoId: 4,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Posto Marajá",
          endereco: "Rua Tocantins, 112",
          associadoId: 5,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Mauro Gás",
          endereco: "Rua Nazaré, 2828",
          associadoId: 6,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Entregas Garcia",
          endereco: "Rua São Paulo, 123",
          associadoId: 1,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Maria Couro",
          endereco: "Rua Rio de Janeiro, 889",
          associadoId: 2,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Pedro Carros",
          endereco: "Rua Conservadores, 200",
          associadoId: 3,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Limpeza Julia",
          endereco: "Rua Palmeiras, 120",
          associadoId: 4,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Tabacaria Marajá",
          endereco: "Rua Tocantins, 112",
          associadoId: 5,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Mauro Motos",
          endereco: "Rua Nazaré, 2828",
          associadoId: 6,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Mototaxi Garcia",
          endereco: "Rua São Paulo, 123",
          associadoId: 1,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Maria Advogada",
          endereco: "Rua Rio de Janeiro, 889",
          associadoId: 2,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Pedro Academia",
          endereco: "Rua Conservadores, 200",
          associadoId: 3,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Mercadinho da Julia",
          endereco: "Rua Palmeiras, 120",
          associadoId: 4,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Cobranças Marajá",
          endereco: "Rua Tocantins, 112",
          associadoId: 5,
        },
        {
          cnpj: cnpj.generate(true),
          nomeEmpresa: "Mauro Funerária",
          endereco: "Rua Nazaré, 2828",
          associadoId: 6,
        },
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Clientes", null, {});
  }
};
