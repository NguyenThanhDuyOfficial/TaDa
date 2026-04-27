import { User } from "@api/generated/prisma/client"
import { prisma } from "@api/common/lib/prisma"
import { CreateUserInput } from "@api/modules/user"


export type UserRepo = {
  findByEmail(email: string): Promise<User | null>;
  create(input: CreateUserInput): Promise<User>;
};


export function createUserRepo() {

  async function findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email: email }
    })
  }

  async function create(input: CreateUserInput): Promise<User> {
    return prisma.user.create({
      data: {
        email: input.email,
        passwordHash: input.passwordHash
      }
    })
  }

  return {
    findByEmail, create
  }
}

