import React from 'react';
import { Navbar, Nav, NavItem, PageHeader, Panel, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import glamorous from 'glamorous';
import bUtils from 'react-bootstrap/lib/utils/bootstrapUtils';
// bUtils.addStyle(Navbar, ['home']);

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
      // toggleOn: false

    }
    this.toggle = this.navClick.bind(this);
  }

  navClick() {
    this.setState({
      isActive: !this.state.isActive
    });
  }

  render() {
    return (
      <Panel className="nav-bar">
        <span className="nav-bar" >
        <Navbar inverse collapseOnSelect fixedTop fluid>
          <Navbar.Header color="#4A0D04">
            <Navbar.Brand>
              <Link to="/home">Lokalize</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          {this.props.isLoggedIn ?
          <Nav>
            <NavItem eventKey={1} href="#"><Link to="/join">Join Event</Link></NavItem>
            <NavItem eventKey={2} href="#"><Link to="/host">Host Event</Link></NavItem>
          </Nav> : ''}
          <Nav pullRight>
          {this.props.isLoggedIn ?
            <NavItem eventKey={1} href="#" onClick={this.props.onLogout}>Log Out</NavItem>
            : ''}
          </Nav>
            </Navbar.Collapse>
        </Navbar>
        <div className="Header">
          <PageHeader> LOKALIZE <small>New York City</small></PageHeader>
        </div>
        </span>

      </Panel>
    )
  }
};

export default Header;
