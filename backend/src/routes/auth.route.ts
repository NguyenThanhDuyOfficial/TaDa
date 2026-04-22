import express from 'express'
import { asyncHandler } from "../utils/asyncHandler"
import { AuthController } from "../controllers/auth.controller"
import { authMiddleware } from "../middleware/auth.middleware";

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
