import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './database';
import express from 'express';
import homeRoutes from './routes/homeRoutes';
import userRoute from './routes/UserRoutes';
import tokenRoute from './routes/TokenRoutes';
import alunoRoute from './routes/AlunoRoutes';
import photoRoute from './routes/PhotoRoutes';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/user', userRoute);
    this.app.use('/token', tokenRoute);
    this.app.use('/aluno', alunoRoute);
    this.app.use('/photo', photoRoute);
  }
}

export default new App().app;
