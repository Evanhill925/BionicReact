import React, { useState, useEffect } from "react"
import DropdownMenu from "./Dropdown"
import loadingPic from "./loader.svg"


function Homepage({ defaultImage }) {
  const [prompt, setPrompt] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [imageID, setImageID] = useState("")
  const [ImagePrompt, setImagePrompt] = useState()
  const [ImageType, setImageType] = useState()
  const [selectedOption, setSelectedOption] = useState("")
  const [loading, setLoading] = useState()
  const uriPath= import.meta.env.VITE_uriPath;

  useEffect(() => {
    // Set the initial imageURL state based on the defaultImage prop when the component is mounted
    setImageURL(defaultImage.image_url)
    setImageID(defaultImage.image_message_id)
    // setImagePrompt(defaultImage.prompt)
    setImageType(defaultImage.type)
    // console.log(defaultImage)
  }, [defaultImage])

  const handlePromptChange = (e) => {
    setPrompt(e.target.value)
  }
  const handleOptionSelect = (option) => {
    // Update the selected option in the Homepage component's state
    setSelectedOption(option)
  }

  const handleFetchImage = async () => {
    if (!loading) {
    setLoading(true)
    console.time("ImageCreatedTimer")
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput: prompt,
          model: `${selectedOption ? selectedOption : " --v 5.2"}`
          // quality: " --quality .25",
        }),
      }

      const res = await fetch(`${uriPath}/Prompt`, requestOptions)
      const data = await res.json()

      setImageID(data.image_message_id)
      setImageURL(data.image_url)
      setImagePrompt(data.prompt)
      setImageType(data.type)
      window.history.pushState(null, "", `?image=${data.image_message_id}`)
    } catch (error) {
      console.error("Error fetching image:", error)
    }
    // clears input after submit button pressed
    setPrompt("")
    setLoading(false)
    console.timeEnd("ImageCreatedTimer")
  }
  }
  const handlePressButton = async (row, column) => {
    if (!loading) {
      setLoading(true);
      console.time("ImageCreatedTimer")
    try {
      // console.log(imageID)

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: ImagePrompt,
          channel_id: "1103168663617556571",
          message_id: imageID,
          row_: row,
          columns_: column,
        }),
      }

      const res = await fetch(`${uriPath}/Button`, requestOptions)
      const data = await res.json() // Parse the response JSON
      setImageID(data.image_message_id)
      setImageURL(data.image_url)
      // setImagePrompt(data.prompt)
      setImageType(data.type)
    } catch (error) {
      console.error("Error fetching image:", error)
    }
    setLoading(false)
    console.timeEnd("ImageCreatedTimer")
  }
  }

  return (
    <div>
      <div className="search-container">
        <h1>Enter a prompt to create an image!&nbsp;</h1>
        <input
          type="text"
          placeholder="Enter a prompt"
          value={prompt}
          onChange={handlePromptChange}
        />
        <button className="sub-button" onClick={handleFetchImage}>
          Submit
        </button>
      </div>
      <DropdownMenu onOptionSelect={handleOptionSelect} />
      {loading ? (
        <div className="loader">
        <img src={loadingPic} alt="Loading" className="loading-placeholder" /> 
        </div>
      ) : (
        imageURL && (
          <div>
            <h2 className="prompt-title">
              {ImagePrompt ? ImagePrompt : defaultImage.prompt}
            </h2>

            <div className="primary-image-container">
              <a target="_blank" href={imageURL}>
                <img
                  src={imageURL}
                  alt="Generated Image"
                  className="primary-image"
                />
              </a>
            </div>

            {[null,'Upscale'].includes(ImageType) ? (
              
              ""
            ) : (
              <div className="buttons">
                <button
                  title="Upscale top left image"
                  onClick={() => handlePressButton(0, 0)}
                >
                  U1
                </button>
                <button
                  title="Upscale top right image"
                  onClick={() => handlePressButton(0, 1)}
                >
                  U2
                </button>
                <button
                  title="Upscale bottom left image"
                  onClick={() => handlePressButton(0, 2)}
                >
                  U3
                </button>
                <button
                  title="Upscale bottom right image"
                  onClick={() => handlePressButton(0, 3)}
                >
                  U4
                </button>
                <button onClick={() => handlePressButton(0, 4)}>↻</button>
                <button onClick={() => handlePressButton(1, 0)}>V1</button>
                <button onClick={() => handlePressButton(1, 1)}>V2</button>
                <button onClick={() => handlePressButton(1, 2)}>V3</button>
                <button onClick={() => handlePressButton(1, 3)}>V4</button>
              </div>
            )}
          </div>
        )
      )}
    </div>
  )
}

export default Homepage