(function (expressConfig) {

    const path         = require('path');
    const favicon      = require('serve-favicon');
    const cookieParser = require('cookie-parser');
    const bodyParser   = require('body-parser');
    const rekuire      = require('rekuire');
    const Logger       = rekuire('Logger');
    const Errors    = rekuire('Errors');
  
  
    expressConfig.init = function (app, express) {
  
      // view engine setup
      app.set('views', path.join(path.dirname(module.parent.filename), 'views'));
      app.set('view engine', 'jade');
    
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(cookieParser());
      app.use(express.static(path.join(path.dirname(module.parent.filename), 'public')));
      
      app.use(function(req, res, next) {
        res.ok = function(body) {
          Logger.log('debug', res.req.method + ' ' + req.originalUrl + ' response', body);
          res.status(200);
          res.json(body);
        }
        res.error = function(error) {
          Logger.log('error', res.req.method + ' ' + req.originalUrl + ' response', error);
          res.status(error.status);
          //res.json({ error: error.error });
          res.json({ errors: [error.error] });
        }
        next();
      });

      // catch 404 and forward to error handler
      // app.use(function(req, res, next) {
      //   //console.log(res);
      //   console.log("-------err catcher");
      //   console.log(res);
      //   var err = new Error('Not Found');
      //   err.status = 404;
      //   next(err);
      // });

      // // error handler
      // app.use(function(err, req, res, next) {
      //   console.log("----err");
      //   Logger.log('error', err);
      //   if (err.status == 404) res.error(Errors.raise('NOT_FOUND'));
      //   else res.error(Errors.raise('INTERNAL_SERVER_ERROR'));
      // });
  
    };
  
  })(module.exports);
  