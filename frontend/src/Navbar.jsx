import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <ul className="navbar-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/gallery">Gallery</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
