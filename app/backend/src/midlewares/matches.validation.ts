import { Request, Response, NextFunction } from 'express';
import { schemaId } from '../utils/schema.joi';
import ErrorHttp, { HttpCode } from '../error/errorHttp';

const validateId = (id: number): void => {
  const { error } = schemaId.validate(id);

  if (error) throw new ErrorHttp(HttpCode.BAD_REQUEST, error.message);
};

const validateMatches = (req: Request, _res: Response, next: NextFunction): void => {
  const { id } = req.params;
  validateId(Number(id));

  next();
};

export default validateMatches;
