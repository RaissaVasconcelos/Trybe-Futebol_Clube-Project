import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces/user.interface';
import ErrorHttp from '../error/errorHttp';
import schemaUsers from '../utils/schema.joi';

const validationEmailPassword = (user: ILogin): void => {
  const { error, value } = schemaUsers.validate(user);
  console.log('error', error);
  console.log(value);
  if (error) throw new ErrorHttp(400, 'All fields must be filled');
};

const validateLogin = (req: Request, _res: Response, next: NextFunction): void => {
  validationEmailPassword(req.body);

  next();
};

export default validateLogin;
