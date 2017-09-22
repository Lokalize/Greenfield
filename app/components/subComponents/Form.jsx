import React from 'react';
import { Panel } from 'react-bootstrap';
import Login from './Login.jsx';

class Myevents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: (
        <h3>Logged out</h3>
      )
    }
  }
  render() {
    return (
      <Panel header={this.state.title} bsStyle="warning">
        <Link to="/logout">Join Event</Link>
        <Login />
      </Panel>
    )
  }
};

export default Myevents;
