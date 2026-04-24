import { User } from "@api/generated/prisma/client"
import { prisma } from "@api/common/lib/prisma"
import { CreateUserInput } from "@api/modules/user"

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
