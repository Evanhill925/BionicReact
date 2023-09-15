import React from "react"

export function Button() {
  function onClick() {
    console.log("Button Clicked")
    // do something here
  }

  return <button onClick={onClick}>IAN TEST BUTTON</button>
}
