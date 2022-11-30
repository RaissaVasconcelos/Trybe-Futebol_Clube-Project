import { IServiceResp } from '../interfaces/messageObject.interface';
import ILeaderBoard from '../interfaces/leaderboard.interface';
import { HttpCode } from '../error/errorHttp';
import Matches from '../database/models/MatchesModel';
import IMatches from '../interfaces/matches.interface';
import TeamsService from './Teams.service';

export default class ServiceLeaderBoard {
  static async getAllLeaderboard(): Promise<IServiceResp<ILeaderBoard>> {
    const teamsAll = await TeamsService.idTeam();
    const arrays = await Promise.all(teamsAll.map(async ({ id }) => this.getTimeHome(id)));
    const orderned = this.orderTeamsLeaderboard(arrays);
    return { statusCode: HttpCode.OK, message: orderned };
  }

  static async returnsObject(array: IMatches[]): Promise<ILeaderBoard> {
    const objectReduce = {
      name: await TeamsService.nameTeam(array[0].homeTeam),
      totalPoints: this.calculatePontuation(array),
      totalGames: this.totalGames(array),
      totalVictories: this.calculatesVictory(array),
      totalDraws: this.calculatesDraws(array),
      totalLosses: this.calculateLosses(array),
      goalsFavor: this.goalsFavor(array),
      goalsOwn: this.goalsOnw(array),
      goalsBalance: this.goalsFavor(array) - this.goalsOnw(array),
      efficiency: this.calculatEefficiency(array),
    };
    return objectReduce;
  }

  static orderTeamsLeaderboard(array: ILeaderBoard[]): ILeaderBoard[] {
    const orderTeams = array.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return orderTeams;
  }

  static async getTimeHome(indexHomeTeam: number): Promise<ILeaderBoard> {
    const matchesAllsFinish = await Matches.findAll({ where: { inProgress: 0 } });

    const arrayTeamFilter = matchesAllsFinish.map(({ dataValues }) => dataValues)
      .filter(({ homeTeam }) => homeTeam === indexHomeTeam);

    const objectLeaderboard = await this.returnsObject(arrayTeamFilter);

    return objectLeaderboard;
  }

  static calculatePontuation(array: IMatches[]): number {
    const pontuations = array.reduce((acc, { homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) {
        return acc + 3;
      }
      if (homeTeamGoals === awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return pontuations;
  }

  static calculatesVictory(array: IMatches[]): number {
    const totalVitory = array.reduce((acc, { homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return totalVitory;
  }

  static calculatesDraws(array: IMatches[]): number {
    const totalDraws = array.reduce((acc, { homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals === awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return totalDraws;
  }

  static calculateLosses(array: IMatches[]): number {
    const totalLosses = array.reduce((acc, { homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals < awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return totalLosses;
  }

  static totalGames(array: IMatches[]): number {
    const totalGames = array.reduce((acc, _curr) => acc + 1, 0);
    return totalGames;
  }

  static goalsFavor(array: IMatches[]): number {
    const totalGoalsfavor = array.reduce((acc, { homeTeamGoals }) => acc + homeTeamGoals, 0);
    return totalGoalsfavor;
  }

  static goalsOnw(array: IMatches[]): number {
    const totalGoalsOwn = array.reduce((acc, { awayTeamGoals }) => acc + awayTeamGoals, 0);
    return totalGoalsOwn;
  }

  static calculatEefficiency(array: IMatches[]): string {
    const efficiency = (this.calculatePontuation(array) / (this.totalGames(array) * 3)) * 100;
    return efficiency.toFixed(2);
  }
}
