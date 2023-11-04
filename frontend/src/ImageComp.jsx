import React from "react"

export default function ImageComp({ images }) {
  // checks if images is an array and if not, returns a message
  if (!Array.isArray(images)) {
    return <p>No images to display.</p>
  }
  return (
    <div className="home-grid">
      {images.map((image) => (
        <div className="grid-item" key={image.id}>
          <a href={`/?image=${image.image_message_id}`}>
            <img
              src={image.image_url}
              id="ImageSlot"
              alt="Image"
              title={image.prompt}
            />
          </a>
        </div>
      ))}
    </div>
  )
}
