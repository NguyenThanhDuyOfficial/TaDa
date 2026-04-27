import express from 'express'

import { asyncHandler } from "@api/common/utils/asyncHandler"
import { authMiddleware, createSessionRepo, createAuthController, createAuthService } from '@api/modules/auth';
import { createUserRepo } from '@api/modules/user';

export function createAuthModule() {
  const userRepo = createUserRepo();
  const sessionRepo = createSessionRepo();

  const authService = createAuthService({
    userRepo,
    sessionRepo,
  });
  const authController = createAuthController({
    authService,
  });

  const router = express.Router()

  router.post('/register', asyncHandler(authController.register))
  router.post('/login', asyncHandler(authController.login))


  router.get("/protected", authMiddleware, (req, res) => {
    res.json({
      message: "You accessed a protected route",
      user: (req as any).user,
    });
  });

  return { router }
}

