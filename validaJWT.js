var User = require('./models/UserModel'),
    jwt = require('jwt-simple'),
    secret = 'yoursecret';

module.exports = function(req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    console.log(token);
    if(token){
        try{
            var decoded = jwt.decode(token, secret);
            console.log('decodando '+decoded);
            if(decoded.exp <= Date.now()){
                res.status(400).json({message: "Acesso expirado, faça login novamente"});
            }
            User.findOne({_id: decoded.iss}, function(error, user){
                if(error) res.status(400).json({message: "Erro ao procurar o usuario do token"});
                req.user = user;
                console.log("Achei usuário " + req.user);
                return next();
            });
        }catch(error){
            res.status(400).json({message: "Erro: Seu token é inválido"});
        }
    }else{
        res.status(400).json({message: "Token não encontrado ou não informado"});
    }
};