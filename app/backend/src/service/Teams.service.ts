import { IServiceResp } from '../interfaces/messageObject.interface';
import Teams from '../database/models/TeamsModel';
import { teams } from '../interfaces/teams.interface';
import ErrorHttp, { HttpCode } from '../error/errorHttp';

export default class TeamsService {
  static async getAllTeams(): Promise<IServiceResp<teams[]>> {
    const result = await Teams.findAll();
    return { statusCode: HttpCode.OK, message: result };
  }

  static async getById(id: number): Promise<IServiceResp<teams>> {
    const [result] = await Teams.findAll({ where: { id } });

    if (!result) throw new ErrorHttp(HttpCode.NOT_FOUND, 'Team is not found');

    return { statusCode: HttpCode.OK, message: result };
  }
}
