import { IUser } from '../interfaces/user.interface';
import User from '../database/models/UserModel';
import { encript, decript } from '../utils/bcrypt';

export default class UserService {
  public usermodel = new User();

  static async login(user: IUser): Promise<string> {
    const { email, password } = user;
    const [userOk] = await User.findAll({
      where: {
        email,
      },
    });
    console.log('user', userOk.dataValues);
    console.log('password', userOk.dataValues.password);
    console.log('cript', await encript(password));
    console.log('decript', await decript(password, userOk.dataValues.password));
    return 'ok';
  }
}
