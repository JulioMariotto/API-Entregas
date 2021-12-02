const associadoSchema = require("../schemas/associadoSchema");
const senhaSchema = require("../schemas/senhaSchema");
const { cnpj } = require("cpf-cnpj-validator");

function validatorRequest(req, res, next) {
    console.log(req.body);

    if(req.route.path === "/login" || req.route.path === "/novo")
        if(!req.body.cnpj || !req.body.senha)
            return res.status(422).json({ error: "Campos obrigatórios não preenchidos."});
    if(req.route.path === "/novo")
        if(!req.body.nomeEmpresa)
            return res.status(422).json({ error: "Campo Nome da Empresa é obrigatório"});
    if(req.route.path === "/buscarCNPJ")        
        if(!req.body.cnpj)
            return res.status(422).json({ error: "Campo CNPJ é obrigatório"});
    if(req.route.path === "/atualizar")
        if(!req.body.id || !req.body.cnpj || !req.body.nomeEmpresa)
            return res.status(422).json({ error: "Campos obrigatórios não preenchidos" })
    
    const { error: validaCampos } = associadoSchema.validate(req.body);
    if(validaCampos)
        return res.status(422).json({ msg: validaCampos.details });
    if(!cnpj.isValid(req.body.cnpj))
        return res.status(422).json({ msg: "Digite um CNPJ válido"});    
      
    next();
}

module.exports = validatorRequest;