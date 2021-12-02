const joi = require("joi");

const associadoSchema = joi.object().keys({
    id: joi.number().integer(),
    nomeEmpresa: joi.string(),
    cnpj: joi.string().min(18),
    senha: joi.string().min(8).pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$!.,*&@#])[0-9a-zA-Z$!.,*&@#]{8,}$/i),
    endereco: joi.string(),
});

module.exports = associadoSchema;