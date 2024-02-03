import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import secureLocalStorage from "react-secure-storage";
import ProfilModal from "./ProfilModal.jsx";
import { useState } from "react";
import { FaBuffer, FaChartBar } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";

const NavbarComponent = () => {
  const [modalShow, setModalShow] = useState(false);
  const user = secureLocalStorage.getItem("user");
  let nama = "User";
  if (user) {
    nama = user.name;
  }

  const avatar = (
    <Image
      src={"/img/img_avatar.png"}
      alt="User"
      roundedCircle
      style={{ width: "30px" }}
    />
  );
  return (
    <Navbar expand="lg" className="bg-body-tertiary print">
      <Container fluid>
        <Navbar.Brand href="/">POS APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title={
                <>
                  <FaBuffer /> {"Master"}
                </>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/category">Category</NavDropdown.Item>
              <NavDropdown.Item href="/supplier">Supplier</NavDropdown.Item>
              <NavDropdown.Item href="/product">Product</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <>
                  <GrTransaction /> {"Transaction"}
                </>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/sales">Sales</NavDropdown.Item>
              <NavDropdown.Item href="/sales-history">
                Sales History
              </NavDropdown.Item>
              <NavDropdown.Item href="/purchase">Purchase</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <>
                  <FaChartBar /> {"Report"}
                </>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/supplier-report">
                Supplier
              </NavDropdown.Item>
              <NavDropdown.Item href="/product-report">
                Product
              </NavDropdown.Item>
              <NavDropdown.Item href="/sales-report">Sales</NavDropdown.Item>
              <NavDropdown.Item href="/purchase-report">
                Purchase
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown
              title={
                <>
                  {avatar} {nama}
                </>
              }
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item href="#" onClick={() => setModalShow(true)}>
                Profil
              </NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ProfilModal
        show={modalShow}
        size="xl"
        modalTitle="Search Supplier"
        onHide={() => setModalShow(false)}
      />
    </Navbar>
  );
};

export default NavbarComponent;
