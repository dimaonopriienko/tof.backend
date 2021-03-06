const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const PromiseRouter = require('express-promise-router');

const debug = require('debug')('app');
const serverConfig = require('../configs/server');

module.exports = function() {
  this.Router = PromiseRouter;

  this.set('port', serverConfig.port);

  this._server = http.createServer(this);
  this._server.listen(serverConfig.port);

  this._server.on('error', (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind =
      typeof serverConfig.port === 'string'
        ? `Pipe ${serverConfig.port}`
        : `Port ${serverConfig.port}`;

    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  this._server.on('listening', () => {
    const addr = this._server.address();
    const bind =
      typeof addr === 'string'
        ? `${pipe} addr`
        : `${serverConfig.port} addr.port`;

    debug(`Listening on ${bind}`);
  });

  this.use(logger('dev'));
  this.use(bodyParser.json());
  this.use(bodyParser.urlencoded({extended: false}));
  this.use(cors());
  this.use(fileUpload());
};
