import crypto from "crypto"

import { prisma } from "@api/common/lib/prisma"
import { Session } from "@api/generated/prisma/client";

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export type SessionRepo = {
  create(userId: string, refreshToken: string, expiresAt: Date): Promise<Session>
}

export function createSessionRepo() {
  async function create(userId: string, refreshToken: string, expiresAt: Date) {
    return prisma.session.create({
      data: {
        userId,
        refreshToken: hashToken(refreshToken),
        expiresAt
      }
    })
  }
  return { create }
}

