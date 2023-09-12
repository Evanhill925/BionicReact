import { useRef } from "react"

export default function Form({ originals, onFilterChange }) {
  const galleryRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    const inputValue = galleryRef.current.value
    const filterImages = originals.filter((image) =>
      image.prompt.includes(inputValue)
    )
    onFilterChange(filterImages) // Call the callback with filteredBabies
  }

  return (
    <div>
      <form onSubmit={handleSubmit} id="gallery-form">
        <label htmlFor="gallery-search">Search the gallery!</label>
        <input id="gallerySearch" type="text" ref={galleryRef} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
