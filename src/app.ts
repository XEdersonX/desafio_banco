import 'dotenv/config';
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // Vê se o erro é do tipo appError
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  // ERRO QUE O SISTEMA NÃO ESPERAVA ACONTECER VAI CAIR AQUI.
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

export default app;
