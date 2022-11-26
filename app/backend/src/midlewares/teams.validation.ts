import { Request, Response, NextFunction } from 'express';
import ErrorHttp, { HttpCode } from '../error/errorHttp';
import { schemaId } from '../utils/schema.joi';

const validationId = (req: Request, _res: Response, next: NextFunction): void => {
  const { id } = req.params;
  const { error } = schemaId.validate(id);

  if (error) throw new ErrorHttp(HttpCode.BAD_REQUEST, 'Id is number');

  next();
};

export default validationId;
