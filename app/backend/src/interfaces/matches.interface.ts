export interface IteamHome {
  teamName: string;
}

export interface IMatchesupdate {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchesCreate extends IMatchesupdate {
  homeTeam: number,
  awayTeam: number,
}

export default interface IMatches extends IMatchesCreate {
  id?: number,
  inProgress: boolean,
  teamHome?: IteamHome;
  teamAway?: IteamHome;
}
