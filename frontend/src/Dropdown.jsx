import React from "react"

function DropdownMenu({ onOptionSelect }) {
  const handleOptionChange = (e) => {
    const option = e.target.value
    // Call the callback function to notify the parent component (Homepage) of the selected option
    onOptionSelect(option)
  }

  return (
    <div>
      <h1>Dropdown Menu Example</h1>
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
