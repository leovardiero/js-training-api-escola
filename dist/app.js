"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');

_dotenv2.default.config();

require('./database');
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _UserRoutes = require('./routes/UserRoutes'); var _UserRoutes2 = _interopRequireDefault(_UserRoutes);
var _TokenRoutes = require('./routes/TokenRoutes'); var _TokenRoutes2 = _interopRequireDefault(_TokenRoutes);
var _AlunoRoutes = require('./routes/AlunoRoutes'); var _AlunoRoutes2 = _interopRequireDefault(_AlunoRoutes);
var _PhotoRoutes = require('./routes/PhotoRoutes'); var _PhotoRoutes2 = _interopRequireDefault(_PhotoRoutes);

const whiteList = [
  'https://js.dev-lbv.com.br',
  'http://localhost:3000',
  'https://pt.wikipedia.org',
];

const corsOpetion = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

_dotenv2.default.config();

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, corsOpetion));
    this.app.use(_helmet2.default.call(void 0, ));
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use('/', _homeRoutes2.default);
    this.app.use('/user', _UserRoutes2.default);
    this.app.use('/token', _TokenRoutes2.default);
    this.app.use('/aluno', _AlunoRoutes2.default);
    this.app.use('/photo', _PhotoRoutes2.default);
  }
}

exports. default = new App().app;
