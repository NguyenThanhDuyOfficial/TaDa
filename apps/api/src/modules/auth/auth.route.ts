import express from 'express'

import { asyncHandler } from "@api/common/utils/asyncHandler"
import { AuthController } from "@api/modules/auth/auth.controller"
import { authMiddleware } from "@api/modules/auth/auth.middleware";

const router = express.Router()

router.post('/register', asyncHandler(AuthController.register))
router.post('/login', asyncHandler(AuthController.login))


router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: (req as any).user,
  });
});

export default router
