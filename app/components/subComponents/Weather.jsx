import React from 'react';
import Forecast from 'react-forecast';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.75,
      long: -73.97,
      city: 'New York City'
    }
  }
  render() {
    return <Forecast latitude={this.state.lat} longitude={this.state.long} name={this.state.city} />
  }
};

export default Weather;