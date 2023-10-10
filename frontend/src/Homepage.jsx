import React, { useState, useEffect } from "react"
import DropdownMenu from "./Dropdown"

function Homepage({ defaultImage }) {
  const [prompt, setPrompt] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [imageID, setImageID] = useState("")
  const [ImagePrompt, setImagePrompt] = useState()
  const [selectedOption, setSelectedOption] = useState("")

  useEffect(() => {
    // Set the initial imageURL state based on the defaultImage prop when the component is mounted
    setImageURL(defaultImage.image_url)
    setImageID(defaultImage.image_message_id)
  }, [defaultImage])

  const handlePromptChange = (e) => {
    setPrompt(e.target.value)
  }
  const handleOptionSelect = (option) => {
    // Update the selected option in the Homepage component's state
    setSelectedOption(option)
  }

  const handleFetchImage = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput: prompt,
          model: ` --quality .25 ${
            selectedOption ? selectedOption : "--v 5.2"
          }`,
        }),
      }

      const res = await fetch("http://localhost:4000/Prompt", requestOptions)
      const data = await res.json()
      setImageID(data.image_message_id)
      setImageURL(data.image_url)
      setImagePrompt(data.prompt)
    } catch (error) {
      console.error("Error fetching image:", error)
    }
    setPrompt("")
  }
  const handlePressButton = async (row, column) => {
    try {
      console.log(imageID)

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel_id: "1103168663617556571",
          message_id: imageID,
          row_: row,
          columns_: column,
        }),
      }

      const res = await fetch("http://localhost:4000/Button", requestOptions)
      const data = await res.json() // Parse the response JSON
      setImageID(data.image_message_id)
      setImageURL(data.image_url)
      setImagePrompt(data.prompt)
    } catch (error) {
      console.error("Error fetching image:", error)
    }
  }

  return (
    <div>
      <h1>Enter a prompt to create an image!</h1>
      <input
        type="text"
        placeholder="Enter a prompt"
        value={prompt}
        onChange={handlePromptChange}
      />
      <button onClick={handleFetchImage}>Submit</button>
      <DropdownMenu onOptionSelect={handleOptionSelect} />

      {/* <button onClick={handlePressButton}>Submit</button> */}

      {imageURL && (
        <div>
          <h2>{ImagePrompt ? ImagePrompt : defaultImage.prompt}</h2>
          <a href={imageURL}>
            <img src={imageURL} alt="Generated Image" />
          </a>
          <button onClick={() => handlePressButton(0, 0)}>U1</button>
          <button onClick={() => handlePressButton(0, 1)}>U2</button>
          <button onClick={() => handlePressButton(0, 2)}>U3</button>
          <button onClick={() => handlePressButton(0, 3)}>U4</button>
          <button onClick={() => handlePressButton(0, 4)}>↻</button>
          <button onClick={() => handlePressButton(1, 0)}>V1</button>
          <button onClick={() => handlePressButton(1, 1)}>V2</button>
          <button onClick={() => handlePressButton(1, 2)}>V3</button>
          <button onClick={() => handlePressButton(1, 3)}>V4</button>
        </div>
      )}
    </div>
  )
}

export default Homepage
