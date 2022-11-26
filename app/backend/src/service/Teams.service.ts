import { IServiceResp } from '../interfaces/messageObject.interface';
import Teams from '../database/models/TeamsModel';
import { teams } from '../interfaces/teams.interface';
import { HttpCode } from '../error/errorHttp';

export default class TeamsService {
  static async getAllTeams(): Promise<IServiceResp<teams[]>> {
    const result = await Teams.findAll();
    return { statusCode: HttpCode.OK, message: result };
  }
}
