import React from "react"

export default function ImageComp({ images }) {
  if (!Array.isArray(images)) {
    return <p className="text-light text-center">No images to display.</p>
  }

  return (
    <div className="container d-flex justify-content-center">
      
      <div className="row g-3 justify-content-center" style={{ maxWidth: "900px" }}>
        {images.map((image) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={image.id}>
            <a href={`/?image=${image.image_message_id}`} className="d-block h-100">
              <img
                src={image.image_url}
                className="img-fluid rounded shadow-sm w-100"
                alt="Image"
                title={image.prompt}
                style={{
                  objectFit: "cover",
                  height: "100%",
                  maxHeight: "300px",
                  backgroundColor: "#1a1a1a", // fallback for broken images
                }}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
