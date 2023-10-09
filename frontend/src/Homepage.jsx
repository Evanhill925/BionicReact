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
  const handlePressButton =  async (row,column,message_id) => {
    try {


      var data = { channel_id:'1103168663617556571',
                      message_id:'1160755552176050227',
                      row_:row,
                      columns_ :column
                  }

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel_id:'1103168663617556571',
        message_id:'1160772773719846954',
        row_:row,
        columns_ :column
    }),
      }
      
      

      const res = await fetch("http://localhost:4000/Button", requestOptions)
      const data = await res.json() // Parse the response JSON

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

      {/* <button onClick={handlePressButton}>Submit</button> */}
      <button onClick={() => handlePressButton(0, 0)}>U1</button>
      <button onClick={() => handlePressButton(0, 1)}>U2</button>
      <button onClick={() => handlePressButton(0, 2)}>U3</button>
      <button onClick={() => handlePressButton(0, 3)}>U4</button>
      <button onClick={() => handlePressButton(0, 4)}>↻</button>
      <button onClick={() => handlePressButton(1, 0)}>V1</button>
      <button onClick={() => handlePressButton(2, 1)}>V2</button>
      <button onClick={() => handlePressButton(3, 2)}>V3</button>
      <button onClick={() => handlePressButton(4, 3)}>V4</button>
      






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
