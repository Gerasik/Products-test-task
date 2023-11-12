import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Spin,
  Switch,
  Typography,
  notification,
} from "antd"
import { useAddProductMutation } from "../services/product"
import { ICreatedProduct } from "../types/product"
import { useAppDispatch } from "../hooks/store"
import { addCreatedProduct } from "../features/product/productSlice"

const { Title } = Typography

const Create = () => {
  const dispatch = useAppDispatch()
  const openNotification = (title: string) => {
    notification.open({
      message: `Product ${title} has been created`,
    })
  }
  const [create, { isLoading }] = useAddProductMutation()

  const onFinish = async (
    values: Pick<
      ICreatedProduct,
      "title" | "description" | "price" | "published"
    >
  ) => {
    try {
      const payload = await create({
        ...values,
        image: "https://i.pravatar.cc",
        category: "electronic",
      }).unwrap()

      const createDate = new Date()

      dispatch(
        addCreatedProduct({
          ...payload,
          id: +createDate.getTime(),
          published: values.published,
          createAt: createDate.toISOString(),
        })
      )

      openNotification(payload.title)
    } catch (error) {
      console.error("rejected", error)
    }
  }

  return (
    <Flex vertical>
      <Title>Create Product</Title>
      <Spin tip="Creating..." spinning={isLoading}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input price!" }]}
          >
            <InputNumber addonAfter="$" />
          </Form.Item>
          <Form.Item label="Published" name="published" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Flex>
  )
}

export default Create
