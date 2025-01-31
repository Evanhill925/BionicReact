import { useState, useEffect } from "react"
import ImageComp from "./ImageComp.jsx"
import Form from "./Form.jsx"
import Pagination from "./Pagination.jsx"
import "./App.css"

function App() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [originals, setOriginals] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("https://localhost:4000/gallery")
      const data = await res.json()
      setImages(data)
      setOriginals(data)
      setLoading(false)
    }
    fetchImages()
  }, [])

  const handleFilterChange = (filteredResults) => {
    console.log(originals)
    setImages(filteredResults)
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [imagesPerPage] = useState(20)

  const indexOfLastImage = currentPage * imagesPerPage
  const indexOfFirstImage = indexOfLastImage - imagesPerPage
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) {
    return <h2>Loading...</h2>
  } else if (images.length === 0) {
    return (
      <>
        <Form originals={originals} onFilterChange={handleFilterChange} />
        <h2>No images found.</h2>
      </>
    )
  }

  return (
    <>
      <Form originals={originals} onFilterChange={handleFilterChange} />

      <ImageComp images={currentImages} />
      <Pagination
        imagesPerPage={imagesPerPage}
        totalImages={images.length}
        paginate={paginate}
      />
    </>
  )
}

export default App
