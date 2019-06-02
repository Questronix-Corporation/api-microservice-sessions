var rekuire = require('rekuire');
var Logger  = rekuire('Logger');
var Errors  = rekuire('Errors');
var express = require('express');
var app     = express();

require('dotenv').config();

var QbosMySQL = rekuire('QbosMySQL');
var express_configuration = require("./express-configuration");
express_configuration.init(app, express);

app.use('/v1/qbos', require('./routes/qbos'));

if(process.env.SKIP_QBOS_MYSQL != 'true') {
  Logger.log('info', '[QbosMySQLDB] Connecting to database');
  let mysqlConnect = QbosMySQL.connect();
  mysqlConnect.then((connect)=>{
    Logger.log('info', '[QbosMySQLDB] Database connected', connect);
  }).catch((error) => {
    Logger.log('error', '[QbosMySQLDB] Database error in connection', error);
  });  
}

let port = process.env.PORT || 8085;
app.listen(port, function () {
	Logger.log('info', '[App] Now up and running', {port: port});
});


module.exports = app;