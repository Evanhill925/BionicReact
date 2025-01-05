import { useEffect, useState } from "react"
import React from "react";

export function Prompt(row,column) {
        async function pressButton(row,column) {
          console.log('were is your god')
          var data = { channel_id:'1103168663617556571',
                      message_id:'1160755552176050227',
                      row_:row,
                      columns_ :column
                  }
                  console.log(data)
          try{

            fetch("https://localhost:4000/Button",data)
            console.log('this workeds')
          }
        catch (error) {
            console.error("Error:", error);
          }
        
        }
        // const fetchImages = async () => {


          
    
    
        //   const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ userInput: 'sad robot',model:' --quality .25' })
        // };
        //   const res = await fetch("http://localhost:4000/Prompt",requestOptions) // this is the number of images that are fetched from the database
        //   const data = await res
        //   // setImages(data)
        //   // setOriginals(data)
        //   // setLoading(false)
        //   console.log(data)
        // }
        pressButton(row,column)
        // fetchImages()
    
}


// async function pressButton(row,column) {
//   var data = { channel_id:'1103168663617556571',
//               message_id:'1160755552176050227',
//               row_:row,
//               columns_ :column
//           }
//   show()

//   try{
//     post(path="/checkmessage",params=data)
//   }
//  catch (error) {
//     console.error("Error:", error);
//   }

// }
