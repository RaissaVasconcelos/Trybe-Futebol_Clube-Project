import { IServiceResp } from '../interfaces/messageObject.interface';
import ILeaderBoard from '../interfaces/leaderboard.interface';
import { HttpCode } from '../error/errorHttp';
import Matches from '../database/models/MatchesModel';
import IMatches from '../interfaces/matches.interface';
// import TeamsService from './Teams.service';
import Teams from '../database/models/TeamsModel';
import { ITeams } from '../interfaces/teams.interface';

export default class ServiceLeaderBoard {
  static async getAllLeaderboard(path: string): Promise<IServiceResp<ILeaderBoard>> {
    // const teamsAll = await TeamsService.idTeam();

    // const arrays = await Promise.all(teamsAll.map(async ({ id }) =>
    //   this.getTeamHomeAndMatches(id, path)));

    const arrays = await this.getTeamHomeAndMatches(1, path);

    // const orderned = this.orderTeamsLeaderboard(arrays);

    return { statusCode: HttpCode.OK, message: arrays };
  }

  static async getAll(): Promise<ITeams[]> {
    // const teamsAll = await TeamsService.idTeam();

    const result = await this.matchesAllsFinish();
    const orderned = this.orderTeamsLeaderboard(result);

    return orderned;
  }

  static async returnsObject(teamName: string, array: IMatches[], id: number)
    : Promise<ILeaderBoard> {
    const objectReduce = {
      name: teamName,
      totalPoints: this.calculatePontuation(id, array),
      totalGames: this.totalGames(array),
      totalVictories: this.calculatesVictory(id, array),
      totalDraws: this.calculatesDraws(array),
      totalLosses: this.calculateLosses(id, array),
      goalsFavor: this.goalsFavor(id, array),
      goalsOwn: this.goalsOnw(id, array),
      goalsBalance: this.goalsFavor(id, array) - this.goalsOnw(id, array),
      efficiency: this.calculatEefficiency(id, array),
    };
    return objectReduce;
  }

  static orderTeamsLeaderboard(array: any[]): any[] {
    const orderTeams = array.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return orderTeams;
  }

  static async matchesAllsFinish(): Promise<ILeaderBoard[]> {
    const matchesAllsFinish = await Teams.findAll({
      include: [
        { model: Matches, as: 'teamHome', where: { inProgress: false } },
        { model: Matches, as: 'teamAway', where: { inProgress: false } },
      ],
    });

    const array = await Promise.all(matchesAllsFinish
      .map(({ dataValues: { teamHome, id, teamName, teamAway } }) => {
        const arrayAll = teamHome.concat(teamAway);
        return this.returnsObject(teamName, arrayAll, id);
      }));

    // console.log('arrayObject', array);

    return array;
  }

  static async getTeamHomeAndMatches(indexTeam: number, path: string): Promise<ILeaderBoard> {
    const teamHomeOrAway = path === 'home' ? 'teamHome' : 'teamAway';

    const matchesAllsFinish = await Teams.findAll({
      include: [
        { model: Matches, as: teamHomeOrAway, where: { inProgress: false } },
      ],
    });

    const arrayTeamFilter = matchesAllsFinish.map(({ dataValues }) => dataValues)
      .filter((team) => team[teamHomeOrAway] === indexTeam);

    const objectLeaderboard = await this.returnsObject(teamHomeOrAway, arrayTeamFilter, 1);

    return objectLeaderboard;
  }

  // static async getNameTeam(team: string, array: IMatches[]): Promise<string> {
  //   if (team === 'homeTeam') {
  //     const nameTeam = await TeamsService.nameTeam(array[0].homeTeam);
  //     return nameTeam;
  //   }
  //   const nameTeam = await TeamsService.nameTeam(array[0].awayTeam);
  //   return nameTeam;
  // }

  static calculatePontuation(id: number, array: IMatches[]): number {
    const pontuations = array
      .reduce((acc, { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
        if (homeTeam === id && homeTeamGoals > awayTeamGoals) {
          return acc + 3;
        }
        if (awayTeam === id && awayTeamGoals > homeTeamGoals) {
          return acc + 3;
        }
        if (homeTeamGoals === awayTeamGoals) {
          return acc + 1;
        }
        return acc;
      }, 0);
    return pontuations;
  }

  static calculatesVictory(id: number, array: IMatches[]): number {
    const totalVitory = array
      .reduce((acc, { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
        if (homeTeam === id && homeTeamGoals > awayTeamGoals) {
          return acc + 1;
        }
        if (awayTeam === id && awayTeamGoals > homeTeamGoals) {
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

  static calculateLosses(id: number, array: IMatches[]): number {
    const totalLosses = array
      .reduce((acc, { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
        if (homeTeam === id && homeTeamGoals < awayTeamGoals) {
          return acc + 1;
        }

        if (awayTeam === id && awayTeamGoals < homeTeamGoals) {
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

  static goalsFavor(id: number, array: IMatches[]): number {
    const totalGoalsfavor = array
      .reduce((acc, { homeTeam, homeTeamGoals, awayTeamGoals }) => {
        if (id === homeTeam) {
          return acc + homeTeamGoals;
        }
        return acc + awayTeamGoals;
      }, 0);
    return totalGoalsfavor;
  }

  static goalsOnw(id: number, array: IMatches[]): number {
    const totalGoalsOnw = array
      .reduce((acc, { homeTeam, homeTeamGoals, awayTeamGoals }) => {
        if (id === homeTeam) {
          return acc + awayTeamGoals;
        }
        return acc + homeTeamGoals;
      }, 0);
    return totalGoalsOnw;
  }

  static calculatEefficiency(id: number, array: IMatches[]): string {
    const efficiency = (this.calculatePontuation(id, array)
      / (this.totalGames(array) * 3)) * 100;
    return efficiency.toFixed(2);
  }
}
