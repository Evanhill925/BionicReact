import React from "react"

function DropdownMenu({ onOptionSelect }) {
  const handleOptionChange = (e) => {
    const option = e.target.value
    // Call the callback function to notify the parent component (Homepage) of the selected option
    onOptionSelect(option)
  }

  return (
    <div className="dropdown-container">
      <h3>
        Choose an exciting extras that'll add a sprinkle of fun to your
        experience!
      </h3>

      <select onChange={handleOptionChange}>
        <option value="">Midjourney (recommended)</option>
        <option value="--niji 5">niji </option>
        <option value="--niji 5 --style cute">niji cute</option>
        <option value="--niji 5 --style scenic">niji scenic</option>
        <option value="--niji 5 --style expressive">niji expressive</option>
        {/* <option value="Dalle 3">Dalle 3</option> */}
      </select>
    </div>
  )
}

export default DropdownMenu
