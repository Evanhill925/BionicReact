import React, { useState, useEffect } from "react"

function Homepage({ defaultImage }) {
  const [prompt, setPrompt] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [imageID, setImageID] = useState("")

  useEffect(() => {
    // Set the initial imageURL state based on the defaultImage prop when the component is mounted
    setImageURL(defaultImage.image_url)
    setImageID(defaultImage.image_message_id)
  }, [defaultImage])

  const handlePromptChange = (e) => {
    setPrompt(e.target.value)
  }

  const handleFetchImage = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput: prompt,
          model: " --quality .25",
        }),
      }

      const res = await fetch("http://localhost:4000/Prompt", requestOptions)
      const data = await res.json()
      setImageObject(data)
      setImageID(data.image_message_id)
      setImageURL(data.image_url)
    } catch (error) {
      console.error("Error fetching image:", error)
    }
  }

  return (
    <div>
      <h1>Home Page</h1>
      <input
        type="text"
        placeholder="Enter a prompt"
        value={prompt}
        onChange={handlePromptChange}
      />
      <button onClick={handleFetchImage}>Submit</button>

      {imageURL && (
        <div>
          <h2>Generated Image</h2>
          <a href={imageURL}>
            <img src={imageURL} alt="Generated Image" />
          </a>
        </div>
      )}
    </div>
  )
}

export default Homepage
