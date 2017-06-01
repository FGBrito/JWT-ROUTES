var jwt = require('jwt-simple'),
    moment = require('moment'),
    secret = 'yoursecret'
    GeneratorTokenCtrl = {};

GeneratorTokenCtrl.GeneratorToken = function(user){
    var Generator = {};
    Generator.expires = moment().add(7,'days').valueOf();
    Generator.token = jwt.encode({
        iss: user.id,
        exp: Generator.expires
    },secret);
    return Generator;
};

module.exports = GeneratorTokenCtrl;