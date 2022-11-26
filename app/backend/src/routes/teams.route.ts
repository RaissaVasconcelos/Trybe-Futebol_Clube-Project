import { Router } from 'express';
import TeamsControlles from '../controllers/Teams.controller';

const route = Router();

route.get('/', TeamsControlles.getAllTeams);

export default route;
