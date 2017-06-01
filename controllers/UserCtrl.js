var User = require('../models/UserModel'),
	GeneratorTokenCtrl = require('./GeneratorTokenCtrl'),
    jwt = require('jwt-simple'),
    //AuthLoginCtrl = require('./AuthLoginCtrl'),    
	UserCtrl = {};

UserCtrl.getUsuarios = function(req, res){
    User.find({},function(error, users){
        if(error) res.status(400).json({error : error});
        if(!users){
            return res.status(400).json({message:"Não existe usuário"});
        }else{
            var usersTotal = {};
            for(var i=0; i < users.length; ++i ){
                usersTotal[i] = {
                    "_id": users[i]._id,
                    "username" : users[i].username
                };
            }
            return res.json(usersTotal);
        }        
    });
}
//criaUsuario
UserCtrl.postUsuario = function(req, res){
	var dados = new User({
		username: req.body.username,
		password: req.body.password
	});
	dados.save(function(error){
		if (error) return res.send(error);
		res.json({message: "Novo-usuário", dados: dados});
	});
}

//UserCtrl.postLogin = AuthLoginCtrl.postAuthUser;
UserCtrl.postLogin = function(req, res){
	var username = req.body.username || '';
    var password = req.body.password || '';
    if (username == '' || password == '') res.status(401).json({message:"Login ou senha inválido!"});
    
    User.findOne({username:username},function(error, user){
        if(error) return res.send(401);
        if(!user){
            res.status(400).json({message:"Usuário na encontrado!"});
        }else{
            user.verificaSenha(password, function(isMath){
                if(!isMath) res.status(400).json({message:"Senha inválida"});
                var token = GeneratorTokenCtrl.GeneratorToken(user);
                return res.json({
                    token: token.token,
					expires: token.expires,
                    user: user.toJSON()
                });
            });
        }
    });

}

module.exports = UserCtrl;