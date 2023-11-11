import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"

export const usePagination = () => {
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

  return { currentPage, setCurrentPage, setCurrentSize }
}
