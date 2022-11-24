import { hash, compare } from 'bcryptjs';

const encript = async (value: string): Promise<string> => hash(value, 10);

const decript = async (value: string, hashed: string): Promise<boolean> => (
  compare(value, hashed)
);

export { encript, decript };
