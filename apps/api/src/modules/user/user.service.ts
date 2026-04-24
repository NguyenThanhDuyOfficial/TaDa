import { User } from "../../generated/prisma/client"
import { AppError } from "@api/common/errors/AppErrors"
import { ERROR_MESSAGES } from "@api/common/constants/errorMessages"
import { CreateUserInput, UserRepository } from "@api/modules/user"

async function getByEmail(email: string): Promise<User> {
  const user = await UserRepository.findByEmail(email)
  if (!user) throw AppError.notFound(ERROR_MESSAGES.USER_NOT_FOUND)

  return user
}

async function create(input: CreateUserInput): Promise<User> {
  const existing = await UserRepository.findByEmail(input.email)
  if (existing) throw AppError.conflict(ERROR_MESSAGES.USER_ALREADY_EXISTS)

  return UserRepository.create(input)
}

export const UserService = { getByEmail, create }
