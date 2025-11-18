import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router'

export default function PrimaryNav () {
  return (
    <Navbar expand="md" className="primary-nav" variant="dark">
      <Container className="py-2">
        <Navbar.Brand as={NavLink} to="/" end>
          Travel Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="primary-nav-links" />
        <Navbar.Collapse id="primary-nav-links">
          <Nav className="ms-auto" navbarScroll>
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/favorites">
              Favorites
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
