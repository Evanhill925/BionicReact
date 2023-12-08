import { Navbar } from "../Navbar"
import { useState, useEffect } from "react"

import "../App.css"
import ImageComp from "../ImageComp"

import Homepage from "../Homepage"

import HelmetComponent from "../HeaderComponent"

export function Home() {
  // const [urlState, setUrlState] = useState()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [singleImage, setSingleImage] = useState([])

  // pulls the last 6 images from DB that we are displaying in ImageComp
  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("http://localhost:4000/userImages/6") // this is the number of images that are fetched from the database
      const data = await res.json()
      setImages(data)
      setLoading(false)
    }
    fetchImages()
  }, [])

  // sets URL and makes sure main image matches, loads random image if no image is currently set
  useEffect(() => {
    // Function to parse query parameters from the URL
    const getQueryParameters = () => {
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      return urlParams
    }

    // Get the image_message_id from the URL
    const urlParams = getQueryParameters()
    const imageMessageId = urlParams.get("image")

    if (imageMessageId) {
      // If image_message_id exists in the URL, fetch and set it
      const fetchImage = async () => {
        const res = await fetch(`http://localhost:4000/image/${imageMessageId}`)
        const data = await res.json()
        setSingleImage(data)
      }
      fetchImage()
    } else {
      // If image_message_id doesn't exist in the URL, fetch a random image
      const fetchRandomImage = async () => {
        const res = await fetch("http://localhost:4000/userImages/50")
        const data = await res.json()
        const randomIndex = Math.floor(Math.random() * 50)
        const randomImage = data[randomIndex]
        setSingleImage(randomImage)

        // Update the URL after setting the random image
        window.history.pushState(
          null,
          "",
          `?image=${randomImage.image_message_id}`
        )
      }
      fetchRandomImage()
    }
  }, [])
  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <>
      <Navbar state={singleImage} />

      <Homepage defaultImage={singleImage} />

      <ImageComp images={images} />
      <HelmetComponent imageDict={singleImage} />
    </>
  )
}
