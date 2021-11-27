const clienteSchema = require("../schemas/clienteSchema");
const { cnpj } = require("cpf-cnpj-validator");

function validatorRequest(req, res, next) {

    if(req.route.path === "/novo")
        if(!req.body.cnpj || !req.body.associadoId || !req.body.nomeEmpresa)
            return res.status(422).json({ error: "Campos obrigatórios não preenchidos."});
    if(req.route.path === "/buscarCNPJ")        
        if(!req.body.cnpj)
            return res.status(422).json({ error: "Campo CNPJ é obrigatório"});
    if(req.route.path === "/buscarID")        
            if(!req.body.associadoId)
                return res.status(422).json({ error: "Campo ID é obrigatório"});
    if(req.route.path === "/atualizar")
        if(!req.body.id || !req.body.cnpj || !req.body.nomeEmpresa)
            return res.status(422).json({ error: "Campos obrigatórios não preenchidos" })
    
    const { error } = clienteSchema.validate(req.body);
    if(error)
        return res.status(422).json({ error: error.details });
    if(!cnpj.isValid(req.body.cnpj))
        return res.status(422).json({ msg: "Digite um CNPJ válido"});    
    next();
}

module.exports = validatorRequest;