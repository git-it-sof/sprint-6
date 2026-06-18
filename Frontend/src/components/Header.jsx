import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Bank Teller App
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/customers">
            Customers
          </Nav.Link>

          <Nav.Link as={NavLink} to="/accounts">
            Accounts
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;