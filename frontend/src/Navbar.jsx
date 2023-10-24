import { Link, useNavigate } from "react-router-dom"

export function Navbar({ state }) {
  const history = useNavigate()

  function handleHomeClick() {
    if (history.location.pathname !== "/") {
      // If you are not on the home route, navigate to the home route
      history.push("/")
    } else {
      // Reload the page to reset the state
      window.location.reload()
    }
  }

  return (
    <div className="navbar">
      <nav>
        <ul className="navbar-list">
          <li>
            <Link to="/" onClick={handleHomeClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/gallery">Gallery</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
