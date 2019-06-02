'use strict';

const TAG     = '[QbosController]';
const rekuire = require('rekuire');
const Logger  = rekuire('Logger');
const Errors  = rekuire('Errors');
const QbosMySQL = rekuire('QbosMySQL');

const qbos_model = rekuire('Qbos');

function QbosController(req, res) {
	this.req = req;
	this.res = res;
};

// Add Company Info
QbosController.prototype.checkCredentials = function(cb, result) {
    let ACTION = '[checkCredentials]';
    
    let data = {
        employee_no: this.req.body.employeeNo,
        email: this.req.body.email
    };

    let checkCredentials = qbos_model.checkCredentials([data.employee_no, data.email]);
    checkCredentials.then((account)=>{
        if(account.length > 0){
            return cb(null, {
                message: "Account Existing"
            });
        }else {
            return cb(Errors.raise('ACCOUNT_NOT_EXISTING'));
        }
    }).catch((error) => {
        Logger.log('error', TAG + ACTION, error);
        return cb(Errors.raise('INTERNAL_SERVER_ERROR', error));
    });
};

module.exports = QbosController;