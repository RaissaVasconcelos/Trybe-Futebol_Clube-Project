import { HttpCode } from './errorHttp';

const mapError = (type: string): number => {
  if (type.includes('required')) return HttpCode.BAD_REQUEST;
  if (type.includes('must be')) return HttpCode.UNAUTHORIZED;
  return HttpCode.OK;
};

export default mapError;
