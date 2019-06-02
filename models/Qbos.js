'use strict';

var mysql = require('../services/QbosMySQL');

exports.checkCredentials = (data) => {
    return new Promise((resolve, reject)=>{
        mysql.execute('SELECT * FROM accounts WHERE employee_no=? and email=?', data)
        .then((data)=>{
            resolve(data);
        }).catch((error)=>{
            reject(error);
        });
    });
};