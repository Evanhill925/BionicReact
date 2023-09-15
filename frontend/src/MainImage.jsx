import React from "react"

export function MainImage({ singleImage }) {
  return (
    <div id="main-image">
      <img src={singleImage.image_url} alt="Image" id="large-image" />
    </div>
  )
}
