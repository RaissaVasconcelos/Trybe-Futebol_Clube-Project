import { IServiceResp } from '../interfaces/messageObject.interface';
// import ILeaderBoard from '../interfaces/leaderboard.interface';
import { HttpCode } from '../error/errorHttp';
import Matches from '../database/models/MatchesModel';
import IMatches from '../interfaces/matches.interface';

export default class ServiceLeaderBoard {
  static async getAllLeaderboard(): Promise<IServiceResp<string>> {
    const array = await this.getTimeHome();
    const arrayNovo = array.reduce((acc, curr) => {
      acc.goalsFavor += curr.homeTeamGoals;
      acc.totalGames += 1;
      acc.goalsOwn += curr.awayTeamGoals;
      acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
      return acc;
    }, {
      name: 'Santos',
      totalPoints: await this.calculatePontuation(),
      totalGames: 0,
      totalVictories: await this.calculatesVictory(),
      totalDraws: await this.calculatesDraws(),
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0 });
    console.log('reduce', arrayNovo);
    return { statusCode: HttpCode.OK, message: 'ok' };
  }

  static async getTimeHome(): Promise<unknown[]> {
    const indexHomeTeam = 14;
    const result = await Matches.findAll({ where: { inProgress: 0 } });
    const array = result.map(({ dataValues }) => dataValues)
      .filter(({ homeTeam }) => homeTeam === indexHomeTeam)
      .reduce((acc, curr) => {
        acc.goalsFavor += curr.homeTeamGoals;
        acc.totalGames += 1;
        acc.goalsOwn += curr.awayTeamGoals;
        acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
        return acc;
      }, {});
    return array;
  }

  static async cbreduce(value: object): Promise<object> {
    const red = value.reduce((acc, curr) => {
      console.log(curr);
      return acc;
    });
    console.log(red);
    return {};
  }

  static async calculatePontuation(): Promise<number> {
    const array = await this.getTimeHome();
    const pontuations = array.reduce((acc, curr) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) {
        return acc + 3;
      }
      if (curr.homeTeamGoals === curr.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return pontuations;
  }

  static async calculatesVictory(): Promise<number> {
    const array = await this.getTimeHome();
    const totalVitory = array.reduce((acc, curr) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return totalVitory;
  }

  static async calculatesDraws(): Promise<number> {
    const array = await this.getTimeHome();
    const totalDraws = array.reduce((acc, curr) => {
      if (curr.homeTeamGoals === curr.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return totalDraws;
  }
}
