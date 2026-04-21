import { User } from "../generated/prisma/client"
import { UserRepository } from "../repositories/user.repository"
import { AppError } from "../errors/AppErrors"
import { ERROR_MESSAGES } from "../constants/errorMessages"
import { CreateUserInput } from "../validations/user.validation"

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
