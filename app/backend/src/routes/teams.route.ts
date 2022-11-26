import { Router } from 'express';
import validationId from '../midlewares/teams.validation';
import TeamsControlles from '../controllers/Teams.controller';

const route = Router();

route.get('/', TeamsControlles.getAllTeams);
route.get('/:id', validationId, TeamsControlles.getById);

export default route;
