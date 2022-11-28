import { Router } from 'express';
import MatchesControlles from '../controllers/Matches.controller';

const route = Router();

route.get('/', MatchesControlles.getAll);
route.post('/', MatchesControlles.createMatches);

export default route;
