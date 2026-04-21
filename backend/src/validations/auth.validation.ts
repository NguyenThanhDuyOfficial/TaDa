import { z } from 'zod'

export const AuthSchema = z.object({
  email: z
    .email({
      error: (issue) => issue.input === undefined
        ? "This field is required"
        : "Not a email"
    })
    .toLowerCase()
    .trim(),
  password: z.string({
    error: (issue) => issue.input === undefined
      ? "This field is required"
      : "Not a string"
  })
})

export type AuthInput = z.infer<typeof AuthSchema>;
