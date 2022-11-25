import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Matches from './MatchesModel';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'home_team' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'away_team' });
Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'home_team' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'away_team' });

export default Teams;
