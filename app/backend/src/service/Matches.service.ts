// import { Op } from 'sequelize';
import ErrorHttp, { HttpCode } from '../error/errorHttp';

import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

import { IServiceResp } from '../interfaces/messageObject.interface';
import IMatches, { IMatchesCreate, IMatchesupdate } from '../interfaces/matches.interface';

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

  static async getByIdMatches(id: number): Promise<IServiceResp<IMatches>> {
    const result = await Matches.findAll({ where: { id } });
    return { statusCode: HttpCode.OK, message: result };
  }

  static async createMatches(matches: IMatchesCreate): Promise<IServiceResp<IMatches>> {
    await this.validateCreate(matches);
    const result = await Matches.create({
      ...matches, inProgress: true,
    });
    return { statusCode: HttpCode.CREATE, message: result };
  }

  static async matchesFinish(id: number): Promise<IServiceResp<string>> {
    await Matches.update({ inProgress: false }, { where: { id } });
    return { statusCode: HttpCode.OK, message: 'Finished' };
  }

  static async validateCreate(matches: IMatchesCreate): Promise<void> {
    const { homeTeam, awayTeam } = matches;
    await this.validateTeam(homeTeam);
    await this.validateTeam(awayTeam);
  }

  static async validateTeam(id: number): Promise<void> {
    const result = await Teams.findAll({ where: { id } });

    if (result.length === 0) {
      throw new ErrorHttp(HttpCode.NOT_FOUND, 'There is no team with such id!');
    }
  }

  static async updateMatches(id: number, matches: IMatchesupdate): Promise<IServiceResp<IMatches>> {
    await Matches.update({ ...matches }, {
      where: { id },
    });

    const updatedMatche = await this.getByIdMatches(id);

    return { statusCode: HttpCode.OK, message: updatedMatche.message };
  }
}
