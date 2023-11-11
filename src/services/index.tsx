import axios from "axios"
import { IProduct } from "../types/product"

export const getProducts = async () => {
  const all = await axios.get<IProduct[]>(
    "https://fakestoreapi.com/products?limit=6"
  )
  console.log("🚀 ~ file: index.tsx:8 ~ getProducts ~ all:", all)

  return all.data
}
