import { Router } from 'express';
import validateLogin from '../midlewares/login.validation.midleware';
import LoginController from '../controllers/Login.controller';
import authorizateUser from '../midlewares/login.authorizate';

const route = Router();

route.post('/', validateLogin, LoginController.login);
route.get('/validate', authorizateUser, LoginController.validate);

export default route;
