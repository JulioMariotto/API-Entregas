const joi = require("joi");

const senhaSchema = joi.object().keys({
    senha: joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$!.,*&@#])[0-9a-zA-Z$!.,*&@#]{8,}$/i),
});

module.exports = senhaSchema;