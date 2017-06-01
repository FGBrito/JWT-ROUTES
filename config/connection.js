var Config = require('./Config');
var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error',function(error){
	console.log(error);
});
db.once('open',function(){
	console.log('Conectado ao MongoDB');
});

mongoose.connect(Config.DB);

module.exports = mongoose;