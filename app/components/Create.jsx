import React from 'react';
import Host from './subComponents/Host.jsx';
import ListEntryCreate from './subComponents/ListEntryCreate.jsx';
import { Container, Jumbotron } from 'react-bootstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      venue: '',
      address: '',
      locality: ''
    }
    this.restaurantsCallback = this.restaurantsCallback.bind(this);
    this.selectRestaurantCallback = this.selectRestaurantCallback.bind(this);
    this.submitEvent = this.submitEvent.bind(this);
  }

  restaurantsCallback(restaurantArray, locality) {
    this.setState({
      restaurants: restaurantArray,
      locality: locality
    })
  }

  selectRestaurantCallback(venue, address) {
    this.setState({
      venue: venue,
      address: address
    })
  }

  submitEvent(name, type, date, capacity) {
    console.log('POST req Parameters', name, type, date, this.state.venue, this.state.address, this.props.userid, this.state.locality, capacity);
      axios.post('/api/form', {
        name: name,
        dinnerType: type,
        date: date,
        capacity: capacity,
        location: this.state.venue,
        address: this.state.address,
        userid: this.props.userid,
        locality: this.state.locality
      })
      .then( (response) => {
        alert('Event successfully created!');
      })
  }

  render() {
    return (
      <div>
        <Host getAllRestaurantsFromQuery={this.restaurantsCallback} submitEventCallback={this.submitEvent}/>
        <ListEntryCreate entries = {this.state.restaurants} selectCallback={this.selectRestaurantCallback}/>
      </div>
    )
  }
}

export default Home;
