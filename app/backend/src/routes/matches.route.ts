import { Router } from 'express';
import validateMatches from '../midlewares/matches.validation';
import MatchesControlles from '../controllers/Matches.controller';

const route = Router();

route.get('/', MatchesControlles.getAll);
route.post('/', validateMatches, MatchesControlles.createMatches);
route.patch('/:id/finish', MatchesControlles.matchesFinish);

export default route;
