
import type { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const existing = req.headers['x-request-id'];
  const id = (typeof existing === 'string' && existing.length > 0) ? existing : uuidv4();
  req.id = id;
  res.setHeader('X-Request-Id', id);
  next();
}
