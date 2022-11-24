import { ErrorRequestHandler } from 'express';
import errorHttpObj from '../error/errorHttp';

const erroMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { statusCode, message } = err as errorHttpObj;

  return res.status(statusCode || 500).json({ message });
};

export default erroMiddleware;
