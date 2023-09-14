import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/Home.jsx"
import { Gallery } from "./pages/Gallery.jsx"

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/gallery", element: <Gallery /> },
])
