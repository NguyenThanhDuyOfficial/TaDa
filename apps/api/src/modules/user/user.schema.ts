import { z } from 'zod'

export const createUserSchema = z.object({
  email: z
    .email({
      error: (issue) => issue.input === undefined
        ? "This field is required"
        : "Not a email"
    })
    .toLowerCase()
    .trim(),
  passwordHash: z.string({
    error: (issue) => issue.input === undefined
      ? "This field is required"
      : "Not a string"
  })
})

export type CreateUserInput = z.infer<typeof createUserSchema>;
