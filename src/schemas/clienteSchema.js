const joi = require("joi");
const { cnpj } = require("cpf-cnpj-validator");

const associadoSchema = joi.object().keys({
    id: joi.number().integer(),
    nomeEmpresa: joi.string(),
    cnpj: joi.string().min(18),
    endereco: joi.string(),
    associadoId: joi.number().integer(),
});

module.exports = associadoSchema;