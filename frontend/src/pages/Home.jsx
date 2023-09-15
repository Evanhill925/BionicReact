import { Navbar } from "../Navbar"
import { useState, useEffect } from "react"
import Form from "../Form.jsx"
import "../App.css"
import ImageComp from "../ImageComp"

export function Home() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("http://localhost:4000/gallery/6")
      const data = await res.json()
      setImages(data)
      setOriginals(data)
      setLoading(false)
    }
    fetchImages()
  }, [])

  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <>
      <Navbar />
      <Form formText={"Enter a prompt!"} />
      <h1>Home page</h1>
      <ImageComp images={images} />
    </>
  )
}
