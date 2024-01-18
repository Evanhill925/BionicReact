import { Navbar } from "../Navbar"
import { useState, useEffect } from "react"
import ImageComp from "../ImageComp.jsx"
import Form from "../SearchForm.jsx"
import Pagination from "../Pagination.jsx"
import "../App.css"

export function Gallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [originals, setOriginals] = useState([])
  const uriPath= import.meta.env.VITE_uriPath;

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch(`${uriPath}/userImages/300`) // this is the number of images that are fetched from the database
      const data = await res.json()
      setImages(data)
      setOriginals(data)
      setLoading(false)
      console.log("billy said you have this many images",data.length)
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
        <Navbar />
        <Form originals={originals} onFilterChange={handleFilterChange} />
        <h2>No images found.</h2>
      </>
    )
  }
  return (
    <>
      <Navbar />
      <Form
        originals={originals}
        onFilterChange={handleFilterChange}
        formText={"Search the Gallery!"}
      />
      <div className="gallery-mobile-section">
      <ImageComp images={currentImages} grid_class={"gallery-grid"}  />
      <Pagination
        imagesPerPage={imagesPerPage}
        totalImages={images.length}
        paginate={paginate}
      />
      </div>
    </>
  )
}
