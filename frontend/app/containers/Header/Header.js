import React, {Component} from 'react';
import {
  Nav,
  NavbarToggler,
  NavItem,
  NavLink,
  Badge
} from 'reactstrap';
import UserDropDown from "./UserDropDown";

import {Link} from "react-router-dom";
import IfGuest from "containers/App/IfGuest";
import IfUser from "containers/App/IfUser";


class Header extends Component {

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Link to="/" className=" navbar-brand"/>
        <IfUser>
          <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
            <span className="navbar-toggler-icon"></span>
          </NavbarToggler>
        </IfUser>
        <IfUser>
          <Nav className="ml-auto" navbar>
            <NavItem className="d-md-down-none">
              <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
            </NavItem>
            <NavItem className="d-md-down-none">
              <NavLink href="#"><i className="icon-list"></i></NavLink>
            </NavItem>
            <NavItem className="d-md-down-none">
              <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
            </NavItem>
            <UserDropDown/>
          </Nav>
        </IfUser>
        <IfUser>
          <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
            <span className="navbar-toggler-icon"></span>
          </NavbarToggler>
        </IfUser>
        <IfGuest>
          <div className="ml-auto">
            <Link to="/signup" className="mr-1 btn btn-simple  text-uppercase">Register</Link>
            <Link to="/login" className="mr-4 btn btn-simple  text-uppercase">Login</Link>
          </div>
        </IfGuest>
      </header>
    )
  }
}

export default Header;
