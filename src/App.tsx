import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Main from "./page/Main"
import Product from "./page/Product"
import { PAGE_CREATE, PAGE_PRODUCTS } from "./common/constants"
import Home from "./page/Home"
import Item from "./page/Item"
import Create from "./page/Create"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "", element: <Home /> },
      {
        path: `/${PAGE_PRODUCTS}`,
        element: <Product />,
      },
      { path: `/${PAGE_CREATE}`, element: <Create /> },
      { path: `/${PAGE_PRODUCTS}/:id`, element: <Item /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
