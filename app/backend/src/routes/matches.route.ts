import { Router } from 'express';
import validateMatches from '../midlewares/matches.validation';
import MatchesControlles from '../controllers/Matches.controller';

const route = Router();

route.get('/', MatchesControlles.getAll);
route.post('/', MatchesControlles.createMatches);
route.patch('/:id/finish', validateMatches, MatchesControlles.matchesFinish);

export default route;
