import { Request, Response, NextFunction } from 'express';
import validatedToken from '../utils/jwt.validation';
import ErrorHttp, { HttpCode } from '../error/errorHttp';

const authorizateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;

  if (!authorizateUser) throw new ErrorHttp(HttpCode.UNAUTHORIZED, 'Token not found');

  const { type, message } = validatedToken(authorization as string);

  if (type) throw new ErrorHttp(HttpCode.UNAUTHORIZED, 'Token must be a valid token');

  req.body.user = message;

  next();
};

export default authorizateUser;
