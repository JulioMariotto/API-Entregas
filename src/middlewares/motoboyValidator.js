const motoboySchema = require("../schemas/motoboySchema");
const senhaSchema = require("../schemas/senhaSchema");
const { cpf } = require("cpf-cnpj-validator");

function validatorRequest(req, res, next) {

    if(req.route.path === "/login" || req.route.path === "/novo")
        if(!req.body.cpf || !req.body.senha)
            return res.status(422).json({ error: "Campos obrigatórios não preenchidos."});
    if(req.route.path === "/novo")
        if(!req.body.nome || !req.body.telefone)
            return res.status(422).json({ error: "Campo Nome é obrigatório"});
    if(req.route.path === "/buscarCPF")        
        if(!req.body.cpf)
            return res.status(422).json({ error: "Campo CPF é obrigatório"});
    if(req.route.path === "/atualizar")
        if(!req.body.id || !req.body.cpf || !req.body.nome || !req.body.telefone)
            return res.status(422).json({ error: "Campos obrigatórios não preenchidos" })
    
    const { error: validaCampos } = motoboySchema.validate(req.body);
    if(validaCampos)
        return res.status(422).json({ error: validaCampos.details });
    if(!cpf.isValid(req.body.cpf)){
        return res.status(422).json({ msg: "Digite um CPF válido"});    
    }
    const { validaSenha } = senhaSchema.validate(req.body);
    if(validaSenha)
        return res.status(422).json({ msg: "A senha deve conter pelo menos uma letra maiúscula, uma letra minuscula, um número e um caracter especial"});    
    next();
}

module.exports = validatorRequest;