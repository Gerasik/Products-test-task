import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { IProduct } from "../types/product"
import { getProduct } from "../services"
import {
  Flex,
  Skeleton,
  Image,
  Typography,
  Rate,
  Statistic,
  Breadcrumb,
} from "antd"
import { LikeOutlined, DollarOutlined } from "@ant-design/icons"

const { Title, Text } = Typography

const Item = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [item, setItem] = useState<IProduct | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData()
    async function getData() {
      if (id) {
        setLoading(true)
        try {
          const newData = await getProduct(+id)
          console.log("🚀 ~ file: Product.tsx:13 ~ getData ~ newData:", newData)
          setItem(newData)
          setLoading(false)
        } catch (error) {
          console.error(error)
          setLoading(false)
        }
      }
    }
  }, [id])

  if (loading) {
    return <Skeleton active></Skeleton>
  }

  if (!item) {
    return <p>Item not found</p>
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate(-1)}>
          <p style={{ cursor: "pointer" }}>{"< Back"}</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Flex gap="middle">
        <Flex gap="middle" vertical>
          <Flex justify="space-between" gap="large">
            <Title>{item.title}</Title>
            <Rate
              style={{ flex: "1 0 auto", paddingTop: "32px" }}
              allowHalf
              defaultValue={item.rating.rate}
            />
          </Flex>
          <Text type="secondary">{item.description}</Text>
          <Flex gap="large" align="end" justify="end">
            <Statistic
              title="Feedback"
              value={item.rating.count}
              prefix={<LikeOutlined />}
            />
            <Statistic
              title="Price"
              value={item.price}
              prefix={<DollarOutlined />}
            />
          </Flex>
        </Flex>
        <Image width="50%" src={item.image} />
      </Flex>
    </>
  )
}

export default Item
