import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import crypto from "crypto"
import "dotenv/config"

import { AppError } from '@api/common/errors/AppErrors'
import { ERROR_MESSAGES } from '@api/common/constants/errorMessages'

import { AuthInput, TokenOutput, SessionRepo, createSessionRepo } from '@api/modules/auth'
import { CreateUserInput, UserRepo } from "@api/modules/user"


export type AuthService = {
  register(input: AuthInput): Promise<TokenOutput>
  login(input: AuthInput): Promise<TokenOutput>
}


export function createAuthService({ userRepo, sessionRepo }: { userRepo: UserRepo, sessionRepo: SessionRepo }) {

  async function createTokens(userId: string) {
    const refreshToken = crypto.randomBytes(64).toString("hex");
    const expiresAt = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days;

    await sessionRepo.create(userId, refreshToken, expiresAt)
    const accessToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET as string)

    const tokenOutput: TokenOutput = {
      accessToken: accessToken,
      refreshToken: refreshToken
    }

    return tokenOutput
  }

  async function register(input: AuthInput): Promise<TokenOutput> {
    const existing = await userRepo.findByEmail(input.email)
    if (existing) throw AppError.unauthorized(ERROR_MESSAGES.INVALID_CREDENTIALS)

    const hashedPassword = await bcrypt.hash(input.password, 10)

    const createUserInput: CreateUserInput = {
      email: input.email,
      passwordHash: hashedPassword,
    };

    const user = await userRepo.create(createUserInput)

    return await createTokens(user.id)
  }

  async function login(input: AuthInput) {
    const user = await userRepo.findByEmail(input.email)
    if (!user) throw AppError.unauthorized(ERROR_MESSAGES.INVALID_CREDENTIALS)

    const isValid = await bcrypt.compare(input.password, user.passwordHash!)
    if (!isValid) throw AppError.unauthorized(ERROR_MESSAGES.INVALID_CREDENTIALS)

    return await createTokens(user.id)
  }

  return { register, login }
}

