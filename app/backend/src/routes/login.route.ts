import { Router } from 'express';
import validateLogin from '../midlewares/login.validation.midleware';
import LoginController from '../controllers/Login.controller';

const route = Router();

route.post('/', validateLogin, LoginController.login);

export default route;
