import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./Router.jsx"
import { ThemeProvider } from "./ThemeContext"
// import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./custom-theme.css"
import "./App.css"

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
  <ThemeProvider>
      <RouterProvider router={router} />
   </ThemeProvider>
</React.StrictMode>
)
