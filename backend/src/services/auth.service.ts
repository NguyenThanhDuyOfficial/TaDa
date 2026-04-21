import bcrypt from 'bcrypt'
import { UserService } from "../services/user.service"
import { AuthInput } from "../validations/auth.validation"
import { CreateUserInput } from '../validations/user.validation'
import { User } from '../generated/prisma/client.ts'
import { AppError } from '../errors/AppErrors'
import { ERROR_MESSAGES } from '../constants/errorMessages.ts'
import jwt from "jsonwebtoken"
import "dotenv/config"
import { sendSuccess } from '../utils/response.ts'
import type { AuthOutput } from "../lib/auth"


async function register(input: AuthInput): Promise<AuthOutput> {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(input.password, salt)

  const createUserInput: CreateUserInput = {
    email: input.email,
    password: hashedPassword
  }

  const user = await UserService.create(createUserInput)

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h'
  })

  return {
    user: {
      id: user.id,
      email: user.email
    },
    accessToken: token
  }
}

async function login(input: AuthInput): Promise<AuthOutput> {
  const user = await UserService.getByEmail(input.email)
  if (!user) throw AppError.notFound(ERROR_MESSAGES.USER_NOT_FOUND)

  const passwordMatch = await bcrypt.compare(input.password, user.password)
  if (!passwordMatch) throw AppError.unauthorized(ERROR_MESSAGES.INVALID_CREDENTIALS)

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h'
  })
  return {
    user: {
      id: user.id,
      email: user.email
    },
    accessToken: token
  }
}

export const AuthService = { register, login };
