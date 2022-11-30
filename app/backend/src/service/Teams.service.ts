import { IServiceResp } from '../interfaces/messageObject.interface';
import Teams from '../database/models/TeamsModel';
import { ITeams } from '../interfaces/teams.interface';
import ErrorHttp, { HttpCode } from '../error/errorHttp';

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

  static async nameTeam(id: number): Promise<string> {
    const [result] = await Teams.findAll({ where: { id } });
    return result.teamName;
  }

  static async idTeam(): Promise<ITeams[]> {
    const result = await Teams.findAll({
      attributes: ['id'],
    });
    return result;
  }
}
