export const ERROR_MESSAGES = {
  // ── Generic ────────────────────────────────────────────────────────────────
  INTERNAL_SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
  INVALID_CREDENTIALS: "Invalid credentials.",
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_FAILED: 'Invalid request data.',
  UNAUTHORIZED: 'Authentication required.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  METHOD_NOT_ALLOWED: 'HTTP method not allowed on this endpoint.',
  TOO_MANY_REQUESTS: 'Too many requests. Please slow down and try again later.',

  // ── Users ──────────────────────────────────────────────────────────────────
  USER_NOT_FOUND: 'User not found.',
  USER_ALREADY_EXISTS: 'A user with this email already exists.',

  // ── Add resource-specific messages here as your app grows ─────────────────
  // PRODUCT_NOT_FOUND: 'Product not found.',
  // ORDER_ALREADY_CANCELLED: 'This order has already been cancelled.',
} as const;

export const SUCCESS_MESSAGES = {
  USER_CREATED: 'User created successfully.',
  USER_UPDATED: 'User updated successfully.',
  USER_DELETED: 'User deleted successfully.',
} as const;
