import 'express';

declare global {
  namespace Express {
    interface Request {
      /**
       * Unique UUID stamped by requestId.middleware on every incoming request.
       * Always present after the requestIdMiddleware runs.
       */
      id: string;

      // ── Uncomment when you add authentication ──────────────────────────────
      // /** Authenticated user — populated by auth.middleware */
      // user?: {
      //   id: string;
      //   email: string;
      //   role: 'admin' | 'user';
      // };
    }
  }
}
