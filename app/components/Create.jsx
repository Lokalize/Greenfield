import React from 'react';
import Host from './subComponents/Host.jsx';
import ListEntryCreate from './subComponents/ListEntryCreate.jsx';
import { Container, Jumbotron } from 'react-bootstrap';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';

const WarningBanner = (props) => {

  let html = (<div className={props.message.success}>
                {props.message.message}
              </div>)
  if (props.message.success === 'success'){
    html = (<div className={props.message.success}>
              {props.message.message} <Link to="/home">Click here to go back to the homepage</Link>
            </div>)
  }
  return (
    html
  );
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      venue: '',
      address: '',
      locality: '',
      isRestaurantSelected: false,
      message: {
        success: '',
        message: ''
      },
      eventSuccessful: ''
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
      address: address,
      isRestaurantSelected: true
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
      .then( (data) => {
        console.log(data.data.success)
        if (data.data.success === 'success'){
          this.setState({
            message: data.data,
            eventSuccessful: true
          })
          return
        }
        this.setState({
          message: data.data,
          eventSuccessful: false
        })

      })
  }

  render() {
    return (
      <div>
        <WarningBanner message={this.state.message}/>
        <Host getAllRestaurantsFromQuery={this.restaurantsCallback} eventSuccessful={this.state.eventSuccessful} submitEventCallback={this.submitEvent} isRestaurantSelected={this.state.isRestaurantSelected}/>
        <ListEntryCreate entries = {this.state.restaurants} selectCallback={this.selectRestaurantCallback}/>
      </div>
    )
  }
}

export default Home;
