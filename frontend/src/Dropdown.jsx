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
        <option value="">Select an option</option>
        <option value="--niji 5 --style cute">cute</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  )
}

export default DropdownMenu
