var express = require('express'),
    routes = require('./router'),
    app = express(),
    Config = require('./config/Config');


app.use('/',routes);

app.listen(Config.SERVER_PORT,function(){
    console.log('Servidor conectado a porta ' + Config.SERVER_PORT);
});
