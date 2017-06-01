var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    router = express.Router(),
    UserCtrl = require('./controllers/UserCtrl'),
    validaJWT = require('./validaJWT');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//Criando as rotas
router.get('/usuarios', validaJWT, UserCtrl.getUsuarios);
router.post('/cria-usuario', validaJWT, UserCtrl.postUsuario);
router.post('/login', UserCtrl.postLogin);

module.exports = router;

