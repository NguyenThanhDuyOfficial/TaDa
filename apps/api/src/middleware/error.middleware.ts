import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

import { logger } from '@api/config/logger';
import { isProd } from '@api/config/env';
import { AppError } from '@api/common/errors/AppErrors';
import { HTTP_STATUS } from '@api/common/constants/httpStatus';
import { ERROR_MESSAGES } from '@api/common/constants/errorMessages';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorMiddleware(err: unknown, req: Request, res: Response, _next: NextFunction): void {

  // ── 1. Zod Validation Error ───────────────────────────────────────────────
  // Thrown when req.body fails schema validation in a controller
  if (err instanceof ZodError) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.VALIDATION_FAILED,
      details: err.flatten().fieldErrors,
      // Example details: { email: ['Invalid email'], name: ['Required'] }
    });
    return;
  }

  // ── 2. Known Operational Error (AppError) ────────────────────────────────
  // These are expected: 404 not found, 401 unauthorized, 409 conflict, etc.
  if (err instanceof AppError && err.isOperational) {
    logger.warn({ requestId: req.id, statusCode: err.statusCode }, err.message);
    res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      ...(err.details !== undefined ? { details: err.details } : {}),
    });
    return;
  }

  // ── 3. Unknown / Programmer Error ────────────────────────────────────────
  // These are bugs: null pointer, failed DB query, etc.
  // Log the full error internally — NEVER expose stack traces to clients.
  logger.error({ requestId: req.id, err }, 'Unhandled error');

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    // Show stack trace only in non-production for easier local debugging
    ...(!isProd && err instanceof Error ? { stack: err.stack } : {}),
  });
}
