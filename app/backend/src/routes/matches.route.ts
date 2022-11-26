import { Router } from 'express';
import MatchesControlles from '../controllers/Matches.controller';

const route = Router();

route.get('/', MatchesControlles.getAll);

export default route;
