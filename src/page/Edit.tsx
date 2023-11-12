import { Flex, Typography, notification } from "antd"
import { useUpdateProductMutation } from "../services/product"
import { ICreatedProduct } from "../types/product"
import { useAppDispatch } from "../hooks/store"
import { updateCreatedProduct } from "../features/product/productSlice"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { useEffect, useState } from "react"
import ProductForm from "../Components/ProductForm"

const { Title } = Typography

const Edit = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()
  const createdProducts = useSelector(
    (state: RootState) => state.persistedReducer.product.createdProducts
  )

  const [initialValues, setInitialValues] = useState<ICreatedProduct | null>(
    null
  )

  useEffect(() => {
    if (id) {
      const item = createdProducts.find((i) => i.id === +id)
      if (item) {
        setInitialValues(item)
      }
    }
  }, [createdProducts, id, initialValues])

  const openNotification = (title: string) => {
    notification.open({
      message: `Product ${title} has been updated`,
    })
  }

  const errorNotification = () => {
    notification.open({
      type: "error",
      message: `Api error`,
    })
  }

  const [create, { isLoading }] = useUpdateProductMutation()

  const onFinish = async (
    values: Pick<
      ICreatedProduct,
      "title" | "description" | "price" | "published"
    >
  ) => {
    try {
      if (initialValues) {
        const payload = await create({
          ...values,
          id: initialValues?.id,
          image: "https://i.pravatar.cc",
          category: "electronic",
        }).unwrap()

        const createDate = new Date()

        dispatch(
          updateCreatedProduct({
            ...payload,
            id: initialValues?.id,
            published: values.published,
            createAt: createDate.toISOString(),
          })
        )

        openNotification(payload.title)
      }
    } catch (_error) {
      errorNotification()
    }
  }

  return (
    <Flex vertical>
      <Title>Edit Product</Title>
      {initialValues && (
        <ProductForm
          onFinish={onFinish}
          isLoading={isLoading}
          initialValues={initialValues}
        />
      )}
    </Flex>
  )
}

export default Edit
