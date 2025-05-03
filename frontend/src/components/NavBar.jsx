// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Navbar, Container, Nav, Button } from 'react-bootstrap';
// import { useTheme } from '../ThemeContext';

// export function NavBar({ state }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { theme, toggleTheme } = useTheme();

//   const handleHomeClick = (e) => {
//     if (location.pathname !== '/') {
//       e.preventDefault();
//       navigate('/');
//     } else {
//       window.location.reload();
//     }
//   };

//   return (
//     <Navbar 
//       expand="lg" 
//       bg={theme} 
//       variant={theme} 
//       className="mb-3 shadow-sm py-2"
//     >
//       <Container>
//         <Navbar.Brand
//           as={Link}
//           to="/"
//           onClick={handleHomeClick}
//           className="fw-bold fs-4"
//         >
//           Bionic Crayons
//         </Navbar.Brand>
        
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto align-items-center">
//             <Nav.Link
//               as={Link}
//               to="/"
//               onClick={handleHomeClick}
//               active={location.pathname === '/'}
//               className="mx-2"
//             >
//               Home
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/gallery"
//               active={location.pathname === '/gallery'}
//               className="mx-2"
//             >
//               Gallery
//             </Nav.Link>
//             <Nav.Item className="ms-3">
//               <Button 
//                 onClick={toggleTheme} 
//                 variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
//                 size="sm"
//                 className="d-flex align-items-center"
//               >
//                 {theme === 'dark' ? (
//                   <>
//                     <span className="me-2">☀️</span>
//                     <span className="d-none d-md-inline">Light Mode</span>
//                   </>
//                 ) : (
//                   <>
//                     <span className="me-2">🌙</span>
//                     <span className="d-none d-md-inline">Dark Mode</span>
//                   </>
//                 )}
//               </Button>
//             </Nav.Item>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavBar;

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useTheme } from '../ThemeContext';
import bionicLogo from '../bioniclogo.png';

export function NavBar({ state }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleHomeClick = (e) => {
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/');
    } else {
      window.location.reload();
    }
  };

  return (
    <Navbar
      expand="lg"
      bg={theme}
      variant={theme}
      className="mb-3 shadow-sm py-3"
    >
      <Container className="px-3 px-md-4">
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={handleHomeClick}
          className="d-flex align-items-center position-relative"
          style={{ zIndex: 5 }}
        >
          <img
            src={bionicLogo}
            alt="Bionic Crayons"
            height="70"
            className="d-inline-block me-2"
            style={{
              maxWidth: '300px',
              filter: theme === 'dark'
                ? 'drop-shadow(0 0 4px rgba(255,255,255,0.5)) brightness(1.1)'
                : 'drop-shadow(0 0 4px rgba(0,0,0,0.4))',
              transform: 'translateY(2px)'
            }}
          />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              onClick={handleHomeClick}
              active={location.pathname === '/'}
              className="mx-2"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/gallery"
              active={location.pathname === '/gallery'}
              className="mx-2"
            >
              Gallery
            </Nav.Link>
            <Nav.Item className="ms-3">
              <Button 
                onClick={toggleTheme} 
                variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
                size="sm"
                className="d-flex align-items-center"
              >
                {theme === 'dark' ? (
                  <>
                    <span className="me-2">☀️</span>
                    <span className="d-none d-md-inline">Light Mode</span>
                  </>
                ) : (
                  <>
                    <span className="me-2">🌙</span>
                    <span className="d-none d-md-inline">Dark Mode</span>
                  </>
                )}
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;