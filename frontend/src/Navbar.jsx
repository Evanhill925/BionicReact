// import { Link, useNavigate } from "react-router-dom"


// export function Navbar({ state }) {
//   const history = useNavigate()

//   function handleHomeClick() {
//     if (history.location.pathname !== "/") {
    
//       history.push("/")
//     } else {
//       window.location.reload()
//     }
//   }
//   return (
//     <div className="navbar">
//       <nav>
//         <ul className="navbar-list" >
//           <li >
//             <Link to="/" onClick={handleHomeClick} style={{ textDecoration: 'none', color: location.pathname === "/" ? "rgb(232, 232, 232)" : "black"}}>
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/gallery" style={{ textDecoration: 'none', color: location.pathname === "/" ? "rgb(232, 232, 232)" : "black"}}
//             >Gallery
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   )
// }
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Navbar({ state }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleHomeClick(e) {
    if (location.pathname !== "/") {
      e.preventDefault();
      navigate("/");
    } else {
      window.location.reload();
    }
  }

  // Set dark mode on mount (if not already applied globally)
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", "dark");
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link
        to="/"
        className="navbar-brand fw-bold text-light"
        onClick={handleHomeClick}
      >
        Bionic Crayons
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link
              to="/"
              onClick={handleHomeClick}
              className={`nav-link ${location.pathname === "/" ? "active text-light" : ""}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/gallery"
              className={`nav-link ${location.pathname === "/gallery" ? "active text-light" : "text-secondary"}`}
            >
              Gallery
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
