import { createElement, useState } from "react"
import { List, Image, Space, Select, Button } from "antd"
import { DollarOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { PaginationConfig } from "antd/es/pagination"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { PAGE_PRODUCTS } from "../common/constants"

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
)

const IconButton = ({
  icon,
  onClick,
}: {
  icon: React.FC
  onClick: () => void
}) => (
  <Button
    type="primary"
    shape="default"
    icon={createElement(icon)}
    onClick={onClick}
  />
)

const CreatedProducts = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const createdProducts = useSelector(
    (state: RootState) => state.persistedReducer.product.createdProducts
  )
  const [size, setSize] = useState(8)

  const paginationConfig: PaginationConfig = { align: "start", pageSize: size }
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={
        searchParams.get("create") === "published"
          ? createdProducts.filter((i) => i.published)
          : createdProducts
      }
      pagination={paginationConfig}
      footer={
        <Space>
          Items per page:
          <Select
            defaultValue={size}
            style={{ width: 120 }}
            onChange={(value) => setSize(value)}
            options={[
              { value: 8, label: 8 },
              { value: 16, label: 16 },
              { value: 20, label: 20 },
            ]}
          />
        </Space>
      }
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText icon={DollarOutlined} text={`${item.price}`} />,
            <IconButton
              icon={EditOutlined}
              onClick={() => navigate(`/${PAGE_PRODUCTS}/edit/${item.id}`)}
            />,
            <IconButton icon={DeleteOutlined} onClick={() => console.log()} />,
            // <IconText icon={StarOutlined} text={`${item.rating.count}`} />,
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
  )
}

export default CreatedProducts
