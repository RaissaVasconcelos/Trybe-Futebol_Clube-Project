import { Request, Response, NextFunction } from 'express';
// import { schemaId } from '../utils/schema.joi';
import ErrorHttp, { HttpCode } from '../error/errorHttp';
import { IMatchesCreate } from '../interfaces/matches.interface';

// const validateId = (id: number): void => {
//   const { error } = schemaId.validate(id);

//   if (error) throw new ErrorHttp(HttpCode.BAD_REQUEST, error.message);
// };

const validateTeams = (matches: IMatchesCreate): void => {
  const { homeTeam, awayTeam } = matches;

  const messageError = 'It is not possible to create a match with two equal teams';

  if (homeTeam === awayTeam) throw new ErrorHttp(HttpCode.UNPROCESSABLE_ENTITY, messageError);
};

const validateMatches = (req: Request, _res: Response, next: NextFunction): void => {
  validateTeams(req.body);

  next();
};

export default validateMatches;
