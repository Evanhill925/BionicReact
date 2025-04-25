import React, { useState, useEffect } from "react"
import DropdownMenu from "./Dropdown"
import loadingPic from "./loader.svg"
import Header from "./Header"
import 'bootstrap/dist/css/bootstrap.min.css';


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
          userInput: `${prompt}`,
          model: `${selectedOption ? selectedOption : " --v 6.1"}`
          // quality: " --quality .25",
        }),
      }

      const res = await fetch(`${uriPath}/Prompt`, requestOptions)
      const data = await res.json()

      setImageID(data.image_message_id)
      setImageURL(data.image_url)
      setImagePrompt(data.prompt.replace("with a small goblin lurking in the background", ""))
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
<div className="container py-4 bg-dark text-light min-vh-100">
  <div className="text-center mb-4">
    <h1>Enter a prompt to create an image.</h1>
  </div>

  <div className="row justify-content-center mb-3">
    <div className="col-12 col-md-8 d-flex flex-column flex-md-row align-items-center gap-2">
      <input
        type="text"
        className="form-control bg-secondary text-light border-0"
        placeholder="Enter a prompt"
        value={prompt}
        onChange={handlePromptChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleFetchImage();
          }
        }}
      />
      <button
        className="btn btn-light fw-bold px-4"
        onClick={handleFetchImage}
      >
        Submit
      </button>
    </div>
  </div>

  <div className="row justify-content-center mb-4">
    <div className="col-auto">
      <DropdownMenu onOptionSelect={handleOptionSelect} />
    </div>
  </div>

  {loading ? (
    <div className="d-flex justify-content-center">
      <img src={loadingPic} alt="Loading" className="img-fluid" />
    </div>
  ) : (
    imageURL && (
      <>
        <h2 className="text-center mb-3">
          {ImagePrompt || defaultImage.prompt}
        </h2>

        <div className="d-flex justify-content-center mb-3">
  <a href={imageURL} target="_blank" rel="noopener noreferrer">
    <img
      src={imageURL}
      alt="Generated"
      className="img-fluid rounded shadow"
      style={{ maxWidth: "100%", height: "auto", maxHeight: "80vh" }}
    />
  </a>
</div>

        {![null, "Upscale"].includes(ImageType) && (
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {["U1", "U2", "U3", "U4", "↻", "V1", "V2", "V3", "V4"].map(
              (label, i) => (
                <button
                  key={label}
                  className="btn btn-outline-light"
                  onClick={() => {
                    const isU = label.startsWith("U");
                    const isV = label.startsWith("V");
                    const index = label === "↻" ? 4 : parseInt(label[1], 10) - 1;
                    handlePressButton(isU ? 0 : isV ? 1 : 0, index);
                  }}
                >
                  {label}
                </button>
              )
            )}
          </div>
        )}
      </>
    )
  )}
</div>

  )
}

export default Homepage