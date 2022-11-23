import { IUser } from '../interfaces/user.interface';
import User from '../database/models/UserModel';

export default class UserService {
  public usermodel = new User();

  static async login(user: IUser): Promise<string> {
    const { email, password } = user;
    const userOk = await User.findAll({
      where: { email, password },
    });
    console.log('user', userOk);
    return 'ok';
  }
}
