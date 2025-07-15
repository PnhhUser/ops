import { IResponseCustom } from '../interfaces/IResponseCustom';

export function responseSerialize<T>(
  data: T,
  message?: string,
): IResponseCustom<T> {
  return {
    success: true,
    data,
    message,
    timestamp: Date.now(),
  };
}
