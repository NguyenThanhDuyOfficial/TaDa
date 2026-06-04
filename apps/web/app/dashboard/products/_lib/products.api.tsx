import { Product } from "./products.type"

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/products`)
    const data = await response.json()
    return data

  } catch (error) {
    console.error("ERROR: fetch all products", error)
    return []
  }
}
