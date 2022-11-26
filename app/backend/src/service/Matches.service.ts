import { IServiceResp } from '../interfaces/messageObject.interface';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { HttpCode } from '../error/errorHttp';
import IMatches from '../interfaces/matches.interface';

export default class MatchesService {
  static async getAllMatches(): Promise<IServiceResp<IMatches[]>> {
    const result = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
        },
        {
          model: Teams,
          as: 'teamAway',
        },
      ],
    });

    return { statusCode: HttpCode.OK, message: result };
  }

  static async getAllFilter(value: string): Promise<IServiceResp<IMatches[]>> {
    const result = await Matches.findAll({
      where: { inProgress: value === 'true' ? 1 : false },
      include: [
        {
          model: Teams,
          as: 'teamHome',
        },
        {
          model: Teams,
          as: 'teamAway',
        },
      ],
    });

    return { statusCode: HttpCode.OK, message: result };
  }
}
