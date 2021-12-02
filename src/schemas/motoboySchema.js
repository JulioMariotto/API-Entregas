const joi = require("joi");
const { cnpj } = require("cpf-cnpj-validator");

const motoboySchema = joi.object().keys({
    id: joi.number().integer(),
    nome: joi.string(),
    cpf: joi.string().min(14),
    senha: joi.string().min(8).pattern(/([a-z]+[@!#$%^&*()/\\]*[\d]|[\d]+[@!#$%^&*()/\\]+[a-z])/i),
    telefone: joi.string().min(11),
});

module.exports = motoboySchema;