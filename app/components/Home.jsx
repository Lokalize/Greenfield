import React from 'react';
import axios from 'axios';
import Weather from './subComponents/Weather.jsx';
import Search from './subComponents/Search.jsx';
import MapWithADirectionsRenderer from './subComponents/Map.jsx';
// import Calendar from './subComponents/Calendar.jsx';
import ListEntry from './subComponents/ListEntry.jsx';
import { Button, Container, Jumbotron, Table, FormGroup, FormControl, } from 'react-bootstrap';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endAddress: [],
      events: [{
        "username": "",
        "eventname": "Slices with Strangers",
        "dinner_type": "Pizza",
        "eventdate": "9/27/17",
        "eventlocation": "NYC",
        "capacity": null
    }]
    }
    this.eventClick = this.eventClick.bind(this)
  }

  componentDidMount () {
    let username = this.props.username;
    axios.get('/api/home', {params: {username}})
      .then((events) => {
        if(events.data.length) {
          this.setState({events: events.data});
        }
      })
      .catch((err) => {
        console.error('axios GET error: ', err);
      })
  }
//create an on click that sets the end address
  eventClick(e) {
    let endAddress = e.target.value;
    endAddress = endAddress.split(',').map((number) => parseFloat(number))
    this.setState({endAddress: endAddress}, () => {
      this.setState({endAddress: []})
    })
  }
  render() {
    return (
      <div>
        <Weather />,
        <Jumbotron>
          <MapWithADirectionsRenderer endAddress={this.state.endAddress || [40.750572, -73.976417]} />,
        </Jumbotron>,
        <Table responsive>
          <thead>
            <tr>
              <th>Event</th>
              <th>Dinner Type</th>
              <th>Date of Event</th>
              <th>Restaurant</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>

              { this.state.events.map((event) => (
                <tr>
                  <td>{event.eventname}</td>
                  <td>{event.dinner_type}</td>
                  <td>{event.eventdate}</td>
                  <td>{event.eventlocation}</td>
                  <td>{event.street}</td>
                  <td><Button bsSize="xsmall" onClick={this.eventClick}  value={event.coordinates}>Get Directions</Button></td>
                </tr>
               ))
              }

          </tbody>
        </Table>
      </div>
    )
  }
}

export default Home;
