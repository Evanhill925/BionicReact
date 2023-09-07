import { useState, useEffect } from "react"
import ImageComp from "./ImageComp.jsx"
import Form from "./Form.jsx"
import Pagination from "./Pagination.jsx"
import "./App.css"

function App() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("http://localhost:4000/gallery")
      const data = await res.json()
      setImages(data)
      setLoading(false)
    }
    fetchImages()
  }, [])

  const [currentPage, setCurrentPage] = useState(1)
  const [imagesPerPage] = useState(20)

  const indexOfLastImage = currentPage * imagesPerPage
  const indexOfFirstImage = indexOfLastImage - imagesPerPage
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Check if data is available and not loading or in error state
  if (loading) {
    return <h2>Loading...</h2>
  } else if (images.length === 0) {
    return <p>No images to display.</p>
  }

  return (
    <>
      <Form />
      <ImageComp images={currentImages} loading={loading} />
      <Pagination
        imagesPerPage={imagesPerPage}
        totalImages={images.length}
        paginate={paginate}
      />
    </>
  )
}

export default App
