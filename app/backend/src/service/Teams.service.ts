import ErrorHttp, { HttpCode } from '../error/errorHttp';

import Teams from '../database/models/TeamsModel';

import { IServiceResp } from '../interfaces/messageObject.interface';
import { ITeams } from '../interfaces/teams.interface';

export default class TeamsService {
  static async getAllTeams(): Promise<IServiceResp<ITeams[]>> {
    const result = await Teams.findAll();
    return { statusCode: HttpCode.OK, message: result };
  }

  static async getById(id: number): Promise<IServiceResp<ITeams>> {
    const [result] = await Teams.findAll({ where: { id } });

    if (!result) throw new ErrorHttp(HttpCode.NOT_FOUND, 'Team is not found');

    return { statusCode: HttpCode.OK, message: result };
  }
}
