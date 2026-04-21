import { User } from "../generated/prisma/client"
import { prisma } from "../lib/prisma.ts"
import { CreateUserInput } from "../validations/user.validation.ts"

async function findByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email: email }
  })
}

async function create(input: CreateUserInput): Promise<User> {
  return prisma.user.create({
    data: {
      email: input.email,
      password: input.password
    }
  })
}

export const UserRepository = { findByEmail, create }
