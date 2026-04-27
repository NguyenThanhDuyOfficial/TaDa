import { Request, Response } from "express";
import { sendSuccess } from '@api/common/utils/response';
import { HTTP_STATUS } from "../../common/constants/httpStatus";

import { AuthSchema, AuthService, TokenOutput } from "@api/modules/auth";



function setAuthCookie(res: Response, tokens: TokenOutput) {
  res.cookie("access_token", tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refresh_token", tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}


export function createAuthController({ authService, }: { authService: AuthService }) {
  async function register(req: Request, res: Response) {
    const input = AuthSchema.parse(req.body)

    const output = await authService.register(input)

    setAuthCookie(res, output)

    sendSuccess(res, null, HTTP_STATUS.CREATED)
  }

  async function login(req: Request, res: Response) {
    const input = AuthSchema.parse(req.body)

    const output = await authService.login(input)

    setAuthCookie(res, output)

    sendSuccess(res, null)
  }
  return { register, login }
}


