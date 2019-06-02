const TAG        = '[qbos]';
const express    = require('express');
const rekuire    = require('rekuire');
const async      = require('async');
const Logger     = rekuire('Logger');
const router     = express.Router();
const fs        = require('fs');

const QbosController = rekuire('QbosController');

router.post('/login', function(req, res, next){
    var ACTION = '[login]';
    Logger.log('debug', TAG + ACTION + ' request body', req.body);

    var _qbos = new QbosController(req);
    async.auto({
        checkCredentials:      _qbos.checkCredentials.bind(_qbos),
    }, function(err, result) {
        if(err) return res.error(err);
        else return res.ok(result.checkCredentials);
    });
});

module.exports = router;