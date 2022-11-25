import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces/user.interface';
import ErrorHttp from '../error/errorHttp';
import schemaUsers from '../utils/schema.joi';
import mapError from '../error/mapError';

const validationEmailPassword = (user: ILogin): void => {
  const { error } = schemaUsers.validate(user);

  if (error) throw new ErrorHttp(mapError(error.message), error.message);
};

const validateLogin = (req: Request, _res: Response, next: NextFunction): void => {
  validationEmailPassword(req.body);

  next();
};

export default validateLogin;
