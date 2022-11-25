import { Request, Response, NextFunction } from 'express';
import validatedToken from '../utils/jwt.validation';
import ErrorHttp, { HttpCode } from '../error/errorHttp';

const authorizateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;

  if (!authorizateUser) throw new ErrorHttp(HttpCode.UNAUTHORIZED, 'Token not found');

  const user = validatedToken(authorization as string);

  req.body.user = user;

  next();
};

export default authorizateUser;
