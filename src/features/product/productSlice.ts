import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { ICreatedProduct, IProduct } from "../../types/product"
import { productApi } from "../../services/product"

export interface CounterState {
  products: IProduct[]
  createdProducts: ICreatedProduct[]
}

const initialState: CounterState = {
  products: [],
  createdProducts: [],
}

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
    },
    addCreatedProduct: (state, action: PayloadAction<ICreatedProduct>) => {
      state.createdProducts = [...state.createdProducts, action.payload]
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.getProducts.matchFulfilled,
      (state, { payload }) => {
        state.products = payload
      }
    )
  },
})

export const { setProducts, addCreatedProduct } = productSlice.actions

export default productSlice.reducer
