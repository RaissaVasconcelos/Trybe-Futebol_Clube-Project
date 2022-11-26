import { Router } from 'express';
import TeamsControlles from '../controllers/Teams.controller';

const route = Router();

route.get('/', TeamsControlles.getAllTeams);
route.get('/:id', TeamsControlles.getById);

export default route;
