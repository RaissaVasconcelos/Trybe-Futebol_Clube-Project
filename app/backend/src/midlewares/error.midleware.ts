import { ErrorRequestHandler } from 'express';
import errorHttpObj from '../error/errorHttp';

const erroMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log('entrei no midleware de erro');

  const { statusCode, message } = err as errorHttpObj;

  res.status(statusCode || 500).json({ message });
};

export default erroMiddleware;
