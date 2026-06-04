import { z } from "zod"

export const addProductSchema = z.object({
  name: z.string(),
  sku: z.string().nullable(),
  price: z.number(),
  stock: z.number(),
  category: z.string().nullable(),
  status: z.enum(["ACTIVE", "INACTIVE", "DRAFT"]),
  description: z.string(),
})


export type FormState = {
  values?: z.infer<typeof addProductSchema>
  errors: null | Partial<Record<keyof z.infer<typeof addProductSchema>, string[]>>
  success: boolean
}

