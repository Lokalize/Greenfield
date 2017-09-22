import React from 'react';
import { Navbar, Nav, NavItem, PageHeader, Panel, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { BrowserRouter, Route, Link } from 'react-router-dom'

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
        <Navbar inverse collapseOnSelect fixedTop fluid>
          <Navbar.Header>
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
          <NavItem eventKey={1} href="#" onClick={this.props.onLogout}>Log Out</NavItem>
        </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="Header">
          <PageHeader> LOKALIZE <small>Random Meetup Generator</small></PageHeader>
        </div>
      </Panel>
    )
  }
};

export default Header;
