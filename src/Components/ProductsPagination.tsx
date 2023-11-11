import { Pagination, Flex } from "antd"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const ProductsPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [currentPage, setCurrentPage] = useState(
    +(searchParams.get("page") || 1)
  )
  const [currentSize, setCurrentSize] = useState(
    +(searchParams.get("size") || 8)
  )

  useEffect(() => {
    setSearchParams({ size: String(currentSize), page: String(currentPage) })
  }, [currentSize, currentPage, setSearchParams])

  return (
    <Flex justify="center">
      <Pagination
        showSizeChanger
        onShowSizeChange={(_current, size) => {
          setCurrentSize(size)
        }}
        onChange={(page) => {
          setCurrentPage(page)
        }}
        pageSizeOptions={["8", "16", "20"]}
        defaultCurrent={currentPage}
        defaultPageSize={currentSize}
        total={500}
      />
    </Flex>
  )
}

export default ProductsPagination
