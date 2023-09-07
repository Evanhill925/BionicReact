import { useEffect, useState } from "react"

export default function Form() {
  const [galleryInput, setGalleryInput] = useState("")
  return (
    <div>
      <form id="gallery-form">
        <label htmlFor="gallery-search">Search the gallery!</label>
        <input
          type="text"
          id="gallery-input"
          value={galleryInput}
          onChange={(e) => setGalleryInput(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}
