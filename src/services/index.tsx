import axios from "axios"
import { IProduct } from "../types/product"

export const getProducts = async () => {
  const { data } = await axios.get<IProduct[]>(
    "https://fakestoreapi.com/products?limit=6"
  )

  return data
}

export const getProduct = async (id: number) => {
  const { data } = await axios.get<IProduct>(
    `https://fakestoreapi.com/products/${id}`
  )

  return data
}
