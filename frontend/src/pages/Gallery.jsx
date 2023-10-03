import { Navbar } from "../Navbar"
import { useState, useEffect } from "react"
import ImageComp from "../ImageComp.jsx"
import Form from "../Form.jsx"
import Pagination from "../Pagination.jsx"
import "../App.css"

export function Gallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [originals, setOriginals] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("http://localhost:4000/userImages/300") // this is the number of images that are fetched from the database
      const data = await res.json()
      setImages(data)
      setOriginals(data)
      setLoading(false)
    }
    fetchImages()
  }, [])


  useEffect(() => {
    const fetchImages = async () => {


      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: 'hat frog ',model:'--quality .25' })
    };
      const res = await fetch("http://localhost:4000/Prompt",requestOptions) // this is the number of images that are fetched from the database
      const data = await res
      // setImages(data)
      // setOriginals(data)
      // setLoading(false)
      console.log('hat daddy')
      console.log(data)
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
      <Navbar />
      <Form
        originals={originals}
        onFilterChange={handleFilterChange}
        formText={"Search the Gallery!"}
      />

      <ImageComp images={currentImages} />
      <Pagination
        imagesPerPage={imagesPerPage}
        totalImages={images.length}
        paginate={paginate}
      />
    </>
  )
}
