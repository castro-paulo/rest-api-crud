'use strict'
const app = require('./api/app');
const http = require('http');
const normalizePort = require('normalize-port');


const port = normalizePort(process.env.port || '8080');


const morgan = require('morgan');
const winston = require('./config/winston');


app.set('port', port);

app.use(morgan('combined', { stream: winston.stream }));

app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

 
  res.status(err.status || 500);
  res.render('error');
});


const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
console.log('API running on the port '+ port);

function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }