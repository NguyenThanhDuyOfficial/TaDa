import { HTTP_STATUS, type HttpStatusCode } from '../constants/httpStatus';
import { ERROR_MESSAGES } from '../constants/errorMessages';

export class AppError extends Error {
  /** HTTP status code to send in the response */
  public readonly statusCode: HttpStatusCode;

  /** true = expected error (show to client); false = bug (hide, log internally) */
  public readonly isOperational: boolean;

  /** Optional extra detail — e.g. Zod validation field errors */
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode: HttpStatusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    options: { isOperational?: boolean; details?: unknown } = {},
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.isOperational = options.isOperational ?? true;
    this.details = options.details;

    // Restore the prototype chain — required when extending built-ins in TS
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  // ── Factory Methods ───────────────────────────────────────────────────────

  /** 400 Bad Request — invalid input, failed validation */
  static badRequest(message: string = ERROR_MESSAGES.VALIDATION_FAILED, details?: unknown) {
    return new AppError(message, HTTP_STATUS.BAD_REQUEST, { details });
  }

  /** 401 Unauthorized — user not authenticated */
  static unauthorized(message: string = ERROR_MESSAGES.UNAUTHORIZED) {
    return new AppError(message, HTTP_STATUS.UNAUTHORIZED);
  }

  /** 403 Forbidden — user authenticated but lacks permission */
  static forbidden(message: string = ERROR_MESSAGES.FORBIDDEN) {
    return new AppError(message, HTTP_STATUS.FORBIDDEN);
  }

  /** 404 Not Found — resource doesn't exist */
  static notFound(message: string = ERROR_MESSAGES.NOT_FOUND) {
    return new AppError(message, HTTP_STATUS.NOT_FOUND);
  }

  /** 409 Conflict — duplicate resource, state conflict */
  static conflict(message: string) {
    return new AppError(message, HTTP_STATUS.CONFLICT);
  }

  /** 429 Too Many Requests */
  static tooManyRequests(message: string = ERROR_MESSAGES.TOO_MANY_REQUESTS) {
    return new AppError(message, HTTP_STATUS.TOO_MANY_REQUESTS);
  }

  /** 500 Internal Server Error — unexpected failure (non-operational) */
  static internal(message: string = ERROR_MESSAGES.INTERNAL_SERVER_ERROR) {
    return new AppError(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, {
      isOperational: false,
    });
  }
}
