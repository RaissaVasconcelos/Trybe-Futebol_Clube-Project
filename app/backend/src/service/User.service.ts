import { compare } from 'bcryptjs';
import createToken from '../utils/jwt';
import User from '../database/models/UserModel';
import { ILogin, IUser } from '../interfaces/user.interface';
import ErrorHttp from '../error/errorHttp';
import { IServiceResp } from '../interfaces/messageObject.interface';

export default class UserService {
  public usermodel = new User();

  static async getUser(user: ILogin): Promise<IUser> {
    const [userOk] = await User.findAll({
      where: {
        email: user.email,
      },
    });

    if (!userOk) throw new ErrorHttp(400, 'Incorrect email or password');

    return userOk.dataValues;
  }

  static async login(user: ILogin): Promise<IServiceResp<string>> {
    const userOk = await this.getUser(user);

    const validate = await this.validatePassword(user.password, userOk.password);

    if (!validate) {
      throw new ErrorHttp(400, 'Incorrect email or password');
    }

    const token = createToken(userOk);

    return { statusCode: 200, message: token };
  }

  static async validatePassword(passworduser: string, passwordDB: string): Promise<boolean> {
    const validate = await compare(passworduser, passwordDB);
    return validate;
  }
}
