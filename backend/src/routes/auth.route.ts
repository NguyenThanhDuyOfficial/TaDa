import express from 'express'
import { asyncHandler } from "../utils/asyncHandler"
import { AuthController } from "../controllers/auth.controller"

const route = express.Router()

route.post('/register', asyncHandler(AuthController.register))
route.post('/login', asyncHandler(AuthController.login))

export default route
