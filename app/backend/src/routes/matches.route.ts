import { Router } from 'express';
import validateMatches from '../midlewares/matches.validation';
import MatchesControlles from '../controllers/Matches.controller';
import authorizateUser from '../midlewares/login.authorizate';

const route = Router();

route.get('/', MatchesControlles.getAll);
route.post('/', authorizateUser, validateMatches, MatchesControlles.createMatches);
route.patch('/:id', MatchesControlles.matchesUpdate);
route.patch('/:id/finish', MatchesControlles.matchesFinish);

export default route;
