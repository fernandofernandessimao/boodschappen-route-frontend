import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

export default function Navigation() {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        ESCHER'S VISIONS
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          <NavbarItem path="/" linkText="Artworks" />
          {/* <NavbarItem path="/other" linkText="Other" /> */}
          {token && user.isArtist ? (
            <NavbarItem path="/auction" linkText="Start an auction" />
          ) : (
            <NavbarItem path="/about" linkText="About" />
          )}
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
