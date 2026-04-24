import { Request, Response } from "express";
import { AuthSchema } from "@api/modules/auth/auth.schema";
import { sendSuccess } from '@api/common/utils/response';
import { AuthService } from '@api/modules/auth/auth.service'



async function register(req: Request, res: Response) {
  const input = AuthSchema.parse(req.body)

  const output = await AuthService.register(input)

  sendSuccess(res, output)
}

async function login(req: Request, res: Response) {
  const input = AuthSchema.parse(req.body)

  const output = await AuthService.login(input)

  sendSuccess(res, output)
}

export const AuthController = { register, login }
