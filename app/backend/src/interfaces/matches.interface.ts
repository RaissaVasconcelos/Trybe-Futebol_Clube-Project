export interface IteamHome {
  teamName: string;
}

export interface IMatchesCreate {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}
export default interface IMatches extends IMatchesCreate {
  id?: number,
  inProgress: boolean,
  teamHome?: IteamHome;
  teamAway?: IteamHome;
}
