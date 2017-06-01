var mongoose = require('../config/connection'),
	bcrypt = require('bcrypt-nodejs');
	
var UsuarioSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

UsuarioSchema.pre('save',function(next){
	var user = this;
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(5, function(error, salt){
		if(error) return next(error);
		bcrypt.hash(user.password, salt, null, function(error, hash){
			if(error) return next(error);
			user.password = hash;
			next();
		});
	});
});
UsuarioSchema.methods.verificaSenha = function(password, next){
	bcrypt.compare(password,this.password, function(error, isMatch){
		if (error) return next(error);
		next(isMatch);
	});
}

module.exports = mongoose.model('User',UsuarioSchema);







































// var mongoose = require('../config/connection'),
// 	bcrypt = require('bcrypt-nodejs'),
// 	Schema = mongoose.Schema;

// var UsuarioSchema = new Schema({
// 	username: {
// 		type: String,
// 		unique: true,
// 		required: true
// 	},
// 	password:{
// 		type: String,
// 		required: true
// 	}
// });
// UsuarioSchema.pre('save',function(next){
// 	var user = this;
// 	if(!user.isModified('password')) return next();
// 	bcrypt.genSalt(5, function(error, salt){
// 		bcrypt.hash(user.password, salt, null, function(error, hash){
// 			if(error) return next(error);
// 			user.password = hash;
// 			next();
// 		});
// 	});
// });
// UsuarioSchema.Methods.verificaSenha = function(password,next){
// 	bcrypt.compare(password, this.password, function(error,isMatch){
// 		if(error) return next(error);
// 		next(isMatch);
// 	});
// };
// module.exports = mongoose.model('User',UsuarioSchema);