import { Navbar } from "../Navbar"
import { useState, useEffect } from "react"
import Form from "../SearchForm.jsx"
import "../App.css"
import ImageComp from "../ImageComp"
import { MainImage } from "../MainImage"
import { Button } from "../Button"
import { Prompt } from "../Prompt"
import Homepage from "../Homepage"

export function Home() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [singleImage, setSingleImage] = useState([])
  const [testImage, setTestImage] = useState([])

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

  useEffect(() => {
    const fetchImages = async () => {
      console.log("it got this far")
      const res = await fetch("http://localhost:4000/image/1158961810209263626") // this is the number of images that are fetched from the database
      const data = await res.json()
      console.log(data)
      console.log(data.image_url)
      setTestImage(data)
      console.log()
      console.log(singleImage)
      // console.log()
      // setLoading(false)
    }
    fetchImages()
  }, [])

  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <>
      <Navbar />
      {/* <MainImage singleImage={singleImage} /> */}
      {/* <Navbar />
      <Form formText={"Enter a prompt!"} />

      <MainImage singleImage={singleImage} />
      <MainImage singleImage={testImage} /> */}
      <Homepage defaultImage={singleImage} />

      {/* <Button dothis={Prompt}/> */}
      {/* <FormTo/> */}
      <ImageComp images={images} />
    </>
  )
}
