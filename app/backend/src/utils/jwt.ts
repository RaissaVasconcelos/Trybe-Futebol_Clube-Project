import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IUser } from '../interfaces/user.interface';

dotenv.config();

const createToken = (data: IUser) => {
  const { password: _, ...rest } = data;
  const token = jwt.sign(rest, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};

export default createToken;
