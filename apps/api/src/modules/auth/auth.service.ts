import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import "dotenv/config"

import { UserService } from "@api/modules/user/user.service"
import { AuthInput } from '@api/modules/auth/auth.schema'
import { CreateUserInput } from '../user/user.schema'
import { User } from '../../generated/prisma/client'
import { AppError } from '@api/common/errors/AppErrors'
import { ERROR_MESSAGES } from '@api/common/constants/errorMessages'
import { sendSuccess } from '@api/common/utils/response'
import type { AuthOutput } from "@api/modules/auth/auth.types"


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
