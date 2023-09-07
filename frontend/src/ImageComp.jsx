import React from "react"

export default function ImageComp({ images, loading }) {
  if (loading) {
    return <h2>Loading...</h2>
  }
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

/*  */
/* // <img src={image.image_url.slice(0, 15)} id="ImageSlot" alt="Image" />
      ))} */
