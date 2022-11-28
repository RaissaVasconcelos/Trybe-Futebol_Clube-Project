import { Router } from 'express';
import MatchesControlles from '../controllers/Matches.controller';

const route = Router();

route.get('/', MatchesControlles.getAll);
route.post('/', MatchesControlles.createMatches);
route.patch('/:id/finish', MatchesControlles.matchesFinish);

export default route;
