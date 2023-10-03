import { Navbar } from "../Navbar"
import { useState, useEffect } from "react"
import Form from "../Form.jsx"
import "../App.css"
import ImageComp from "../ImageComp"
import { MainImage } from "../MainImage"
import { Button } from "../Button"

export function Home() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [singleImage, setSingleImage] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("http://localhost:4000/userImages/6") // this is the number of images that are fetched from the database
      const data = await res.json()
      setImages(data)
      setLoading(false)
    }
    fetchImages()
  }, [])

  useEffect(() => {
    const fetchSingle = async () => {
      const res = await fetch("http://localhost:4000/userImages/50")
      const data = await res.json()

      // Generate a random index within the range of 0 to 49
      const randomIndex = Math.floor(Math.random() * 50)
      // Select a random image using the random index
      const randomImage = data[randomIndex]

      setSingleImage(randomImage)
    }

    fetchSingle()
  }, [])

  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <>
      <Navbar />
      <Form formText={"Enter a prompt!"} />

      <MainImage singleImage={singleImage} />
      {/* <Button dothis={}/> */}
      {/* <FormTo/> */}
      <ImageComp images={images} />
    </>
  )
}
