import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IProduct, IProductPostData } from "../types/product"

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/products" }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], string>({
      query: () => "",
    }),
    getProductByID: builder.query<IProduct, string>({
      query: (id) => `/${id}`,
    }),
    addProduct: builder.mutation<Omit<IProduct, "rating">, IProductPostData>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIDQuery,
  useAddProductMutation,
} = productApi
