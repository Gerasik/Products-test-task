import { Tabs, TabsProps } from "antd"
import ApiProducts from "../Components/ApiProducts"
import CreatedProducts from "../Components/CreatedProducts"

const tabItems: TabsProps["items"] = [
  {
    key: "1",
    label: "Api products",
    children: <ApiProducts />,
  },
  {
    key: "2",
    label: "Created products",
    children: <CreatedProducts />,
  },
]

const Product = () => {
  return <Tabs defaultActiveKey="1" items={tabItems} />
}

export default Product
