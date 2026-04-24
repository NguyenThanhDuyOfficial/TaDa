import type { Response } from 'express';

import { HTTP_STATUS, type HttpStatusCode } from '../constants/httpStatus';

interface SuccessPayload<T> {
  success: true;
  statusCode: HttpStatusCode;
  message?: string;
  data: T;
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode: HttpStatusCode = HTTP_STATUS.OK,
  message?: string,
): void {
  const payload: SuccessPayload<T> = { success: true, statusCode, data };
  if (message) payload.message = message;
  res.status(statusCode).json(payload);
}

/**
 * Send a 204 No Content response (used for DELETE endpoints).
 * No body is returned — this is correct HTTP behaviour for deletions.
 */
export function sendNoContent(res: Response): void {
  res.status(HTTP_STATUS.NO_CONTENT).send();
}
