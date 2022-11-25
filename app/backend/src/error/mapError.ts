import { HttpCode } from './errorHttp';

const mapError = (type: string): number => {
  if (type.includes('fields')) return HttpCode.BAD_REQUEST;
  if (type.includes('Incorrect email or password')) return HttpCode.UNAUTHORIZED;
  return HttpCode.OK;
};

export default mapError;
