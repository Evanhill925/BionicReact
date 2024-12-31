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
        Here are some exciting extras that'll add a sprinkle of fun to your
        experience!&nbsp;
      </h3>

      <select onChange={handleOptionChange}>
        <option value="">Midjourney (recommended)</option>
        <option value=" --niji 6">niji </option>
        <option value="Dalle 3">Dalle 3</option> 
      </select>
    </div>
  )
}

export default DropdownMenu
