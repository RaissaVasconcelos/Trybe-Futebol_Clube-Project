import { IServiceResp } from '../interfaces/messageObject.interface';
import ILeaderBoard from '../interfaces/leaderboard.interface';
import { HttpCode } from '../error/errorHttp';
import Matches from '../database/models/MatchesModel';
import IMatches from '../interfaces/matches.interface';
import TeamsService from './Teams.service';

export default class ServiceLeaderBoard {
  static async getAllLeaderboard(path: string): Promise<IServiceResp<ILeaderBoard>> {
    const teamsAll = await TeamsService.idTeam();
    const arrays = await Promise.all(teamsAll.map(async ({ id }) => this.getTeamHome(id, path)));
    const orderned = this.orderTeamsLeaderboard(arrays);
    return { statusCode: HttpCode.OK, message: orderned };
  }

  static async returnsObject(team: string, array: IMatches[]): Promise<ILeaderBoard> {
    const objectReduce = {
      name: await this.getNameTeam(team, array),
      totalPoints: this.calculatePontuation(team, array),
      totalGames: this.totalGames(array),
      totalVictories: this.calculatesVictory(team, array),
      totalDraws: this.calculatesDraws(array),
      totalLosses: this.calculateLosses(team, array),
      goalsFavor: this.goalsFavor(team, array),
      goalsOwn: this.goalsOnw(team, array),
      goalsBalance: this.goalsFavor(team, array) - this.goalsOnw(team, array),
      efficiency: this.calculatEefficiency(team, array),
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

  static async getTeamHome(indexTeam: number, path: string): Promise<ILeaderBoard> {
    const teamHomeOrAway = `${path}Team`;

    const matchesAllsFinish = await Matches.findAll({ where: { inProgress: 0 } });

    const arrayTeamFilter = matchesAllsFinish.map(({ dataValues }) => dataValues)
      .filter((team) => team[teamHomeOrAway] === indexTeam);

    const objectLeaderboard = await this.returnsObject(teamHomeOrAway, arrayTeamFilter);

    return objectLeaderboard;
  }

  static async getNameTeam(team: string, array: IMatches[]): Promise<string> {
    if (team === 'homeTeam') {
      const nameTeam = await TeamsService.nameTeam(array[0].homeTeam);
      return nameTeam;
    }
    const nameTeam = await TeamsService.nameTeam(array[0].awayTeam);
    return nameTeam;
  }

  static calculatePontuation(team: string, array: IMatches[]): number {
    const pontuations = array.reduce((acc, { homeTeamGoals, awayTeamGoals }) => {
      if (team === 'homeTeam' && homeTeamGoals > awayTeamGoals) {
        return acc + 3;
      }
      if (team === 'awayTeam' && awayTeamGoals > homeTeamGoals) {
        return acc + 3;
      }
      if (homeTeamGoals === awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return pontuations;
  }

  static calculatesVictory(team: string, array: IMatches[]): number {
    const totalVitory = array.reduce((acc, { homeTeamGoals, awayTeamGoals }) => {
      if (team === 'homeTeam' && homeTeamGoals > awayTeamGoals) {
        return acc + 1;
      }
      if (team === 'awayTeam' && awayTeamGoals > homeTeamGoals) {
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

  static calculateLosses(team: string, array: IMatches[]): number {
    const totalLosses = array.reduce((acc, { homeTeamGoals, awayTeamGoals }) => {
      if (team === 'homeTeam' && homeTeamGoals < awayTeamGoals) {
        return acc + 1;
      }

      if (team === 'awayTeam' && awayTeamGoals < homeTeamGoals) {
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

  static goalsFavor(team: string, array: IMatches[]): number {
    if (team === 'homeTeam') {
      const totalGoalsfavor = array.reduce((acc, { homeTeamGoals }) => acc + homeTeamGoals, 0);
      return totalGoalsfavor;
    }
    const totalGoalsfavor = array.reduce((acc, { awayTeamGoals }) => acc + awayTeamGoals, 0);
    return totalGoalsfavor;
  }

  static goalsOnw(team: string, array: IMatches[]): number {
    if (team === 'homeTeam') {
      const totalGoalsOwn = array.reduce((acc, { awayTeamGoals }) => acc + awayTeamGoals, 0);
      return totalGoalsOwn;
    }
    const totalGoalsOwn = array.reduce((acc, { homeTeamGoals }) => acc + homeTeamGoals, 0);
    return totalGoalsOwn;
  }

  static calculatEefficiency(team: string, array: IMatches[]): string {
    const efficiency = (this.calculatePontuation(team, array) / (this.totalGames(array) * 3)) * 100;
    return efficiency.toFixed(2);
  }
}
