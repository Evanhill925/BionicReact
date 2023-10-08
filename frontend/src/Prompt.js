import { useEffect, useState } from "react"
import React from "react";

export function Prompt() {
        const fetchImages = async () => {


          
    
    
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userInput: 'sad robot',model:'--quality .25' })
        };
          const res = await fetch("http://localhost:4000/Prompt",requestOptions) // this is the number of images that are fetched from the database
          const data = await res
          // setImages(data)
          // setOriginals(data)
          // setLoading(false)
          console.log(data)
        }
        fetchImages()
    
}


