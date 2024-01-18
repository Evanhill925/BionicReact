import React from "react"

export default function ImageComp({ images, grid_class }) {
  // checks if images is an array and if not, returns a message
  if (!Array.isArray(images)) {
    return <p>No images to display.</p>
  }
  return (
    <div className={grid_class}>
      {images.map((image) => (
        <div className={"grid-item"} key={image.id}>
          <a href={`/?image=${image.image_message_id}`}>
            <img
              src={image.image_url}
              className="image-slot"
              alt="Image"
              title={image.prompt}
            />
          </a>
        </div>
      ))}
    </div>
  )
}
