import { useRef } from "react";

export default function Form({ originals, onFilterChange, formText }) {
  const galleryRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const inputValue = galleryRef.current.value;

    // Add a null check for image.prompt to avoid the error
    const filterImages = originals.filter((image) =>
      image.prompt && image.prompt.includes(inputValue)
    );

    onFilterChange(filterImages);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} id="gallery-form">
        <label htmlFor="gallery-search">{formText}</label>
        <input id="gallerySearch" type="text" ref={galleryRef} />
        <button className="sub-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

