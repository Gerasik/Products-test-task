import { createElement } from "react"
import { List, Image, Space } from "antd"
import { DollarOutlined, StarOutlined } from "@ant-design/icons"
import ProductsPagination from "../Components/ProductsPagination"
import { Link } from "react-router-dom"
import { useGetProductsQuery } from "../services/product"
import { PaginationConfig } from "antd/es/pagination"
// import { usePagination } from "../hooks/usePagination"
// import { useSearchParams } from "react-router-dom"

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
)

const Product = () => {
  const { data, isLoading } = useGetProductsQuery("")

  const paginationConfig: PaginationConfig = {}

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        loading={isLoading}
        pagination={paginationConfig}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={StarOutlined} text={`${item.rating.count}`} />,
              <IconText icon={DollarOutlined} text={`${item.price}`} />,
              // <IconText
              //   icon={MessageOutlined}
              //   text="2"
              // />,
            ]}
            extra={<Image height={272} alt={item.title} src={item.image} />}
          >
            <List.Item.Meta
              title={<Link to={`./${item.id}`}>{item.title}</Link>}
            />
            {item.description}
          </List.Item>
        )}
      />
      <ProductsPagination />
    </>
  )
}

export default Product
