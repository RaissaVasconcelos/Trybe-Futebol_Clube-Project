import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const validatedToken = (token: string) => {
  const data = jwt.verify(token, process.env.JWT_SECRET as string);
  return data;
};

export default validatedToken;
