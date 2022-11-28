import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const validatedToken = (token: string) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET as string);
    return { type: null, message: data };
  } catch (error) {
    return { type: 'TOKEN_INVALID', message: error };
  }
};

export default validatedToken;
