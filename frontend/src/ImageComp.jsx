import React from "react"

export default function ImageComp({ images }) {
  // checks if images is an array and if not, returns a message
  if (!Array.isArray(images)) {
    return <p>No images to display.</p>
  }
  return (
    <div>
      {images.map((image) => (
        <div className="image" key={image.id}>
          <img src={image.image_url} id="ImageSlot" alt="Image" />
        </div>
      ))}
    </div>
  )
}
