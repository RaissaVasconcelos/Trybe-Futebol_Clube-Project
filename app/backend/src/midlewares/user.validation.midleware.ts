import { Request, Response, NextFunction } from 'express';
import ErrorHttp from '../error/errorHttp';
import schemaUsers from '../utils/schema.joi';

const validationEmailPassword = (user: unknown): void => {
  const { error } = schemaUsers.validate(user);

  if (error) throw new ErrorHttp(400, 'All fields must be filled');
};

const validateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { user } = req.body;
  validationEmailPassword(user);
  next();
};

export default validateUser;
