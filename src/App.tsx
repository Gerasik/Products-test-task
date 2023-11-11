import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Main from "./page/Main"
import Product from "./page/Product"
import { PAGE_PRODUCTS } from "./common/constants"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [{ path: `/${PAGE_PRODUCTS}`, element: <Product /> }],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
