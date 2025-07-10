import { Response } from '../interfaces/response.interface';

export function serializeResponse<T>(data: T, message?: string): Response<T> {
  return {
    success: true,
    data,
    message,
    timestamp: Date.now(),
  };
}
