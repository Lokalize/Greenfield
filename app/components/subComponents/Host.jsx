import React from 'react';
import { Form, FormGroup, FormControl, PageHeader, ButtonToolbar, Button, ButtonGroup, DropdownButton, MenuItem, ControlLabel } from 'react-bootstrap';
import _ from 'underscore';
import axios from 'axios';
import {Debounce} from 'react-throttle';
import ids from '../../lib/idReferencesForApi';
import $ from 'jquery';

// import Picker from './DatePicker.jsx';

class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: 'Cuisine',
      date: '',
      locationForQuery: 'Locality',
      capacity: ''
    },

    this.nameChange = this.nameChange.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.locationChange = this.locationChange.bind(this);
    this.clickCreate = this.clickCreate.bind(this);
    this.clickCancel = this.clickCancel.bind(this);
    this.capacityChange = this.capacityChange.bind(this);
  };


  getValidationSate(key) {
    // if (this.state[key].length) return 'success';
    // else if (this.state[key].length > 25) return 'warning';
    // else { return 'error'; };
  };

  nameChange(e) {
    this.setState({ name: e.target.value });
  };

  typeChange(e) {
    this.setState({ type: e });
  };

  dateChange(e) {
    this.setState({ date: e.target.value });
  };

  capacityChange(e) {
    this.setState({ capacity: e.target.value });
  }

  locationChange(e) {
    this.setState({ locationForQuery: e})
      var locationId = ids.localities[e];
      var cuisineId = ids.cuisines[this.state.type];
      var reqUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=" + locationId + "&entity_type=subzone&cuisines=" + cuisineId;
      var config = {
        "headers" : {
      	   "Content-Type": "application/json",
      	    "user-key": "0531c898c316947b94f8b79453e43caf"
          }
        };
      axios.get(reqUrl, config)
      .then( (results) => {
        console.log('API call', results);
        this.props.getAllRestaurantsFromQuery(results.data.restaurants, this.state.locationForQuery);
      })
  };

  clickCreate(e) {
    e.preventDefault();
    this.props.submitEventCallback(this.state.name, this.state.type, this.state.date, this.state.capacity);
    this.setState({
      name: '',
      type: 'Cuisine',
      date: '',
      locationForQuery: 'Locality',
      capacity: '',
    })
    $('#options').toggle();
  };

  clickCancel() {
    this.setState({
      name: '',
      type: '',
      date: '',
      location: ''
    })
    $('#options').toggle();
  };

  render() {
    return (
      <div>
        <Form>

          <FormGroup className="eventName" controlId="name" validationState={this.getValidationSate(this.state.name)}>
            <FormControl
              type="text"
              value={this.state.name}
              placeholder="Event name"
              onChange={this.nameChange}
            />
            <FormControl.Feedback />
          </FormGroup>

            <ButtonGroup>
              <DropdownButton
                title={this.state.type}
                id="bg-nested-dropdown"
                onSelect={this.typeChange}
              >
                <MenuItem eventKey="American" >American</MenuItem>
                <MenuItem eventKey="Asian" >Asian</MenuItem>
                <MenuItem eventKey="BBQ" >BBQ</MenuItem>
                <MenuItem eventKey="Breakfast" >Breakfast</MenuItem>
                <MenuItem eventKey="Burger" >Burger</MenuItem>
                <MenuItem eventKey="Cafe" >Cafe</MenuItem>
                <MenuItem eventKey="Diner" >Diner</MenuItem>
                <MenuItem eventKey="Fusion" >Fusion</MenuItem>
                <MenuItem eventKey="Italian" >Italian</MenuItem>
                <MenuItem eventKey="Mexican" >Mexican</MenuItem>
                <MenuItem eventKey="Pizza" >Pizza</MenuItem>
                <MenuItem eventKey="Seafood" >Seafood</MenuItem>
                <MenuItem eventKey="Steak" >Steak</MenuItem>
                <MenuItem eventKey="Vegetarian" >Vegetarian</MenuItem>
                <MenuItem eventKey="" >No Preference</MenuItem>
              </DropdownButton>
            </ButtonGroup><br/><br/>

          <FormGroup className="capacityField" controlId="capacity">
              <FormControl
                type="number"
                value={this.state.capacity}
                placeholder="How many people can come?"
                onChange={this.capacityChange}
              />
              <FormControl.Feedback />
            </FormGroup>

          <FormGroup controlId="date" validationState={this.getValidationSate(this.state.date)}>
            <FormControl
              type="date"
              value={this.state.date}
              placeholder="Date of Event"
              onChange={this.dateChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <ButtonGroup>
            <DropdownButton
              title={this.state.locationForQuery}
              id="bg-nested-dropdown"
              onSelect={this.locationChange}
            >
              <MenuItem eventKey="Chelsea" >Chelsea</MenuItem>
              <MenuItem eventKey="East Village" >East Village</MenuItem>
              <MenuItem eventKey="Financial District" >Financial District</MenuItem>
              <MenuItem eventKey="Greenwich Village" >Greenwich Village</MenuItem>
              <MenuItem eventKey="Gramercy-Flatiron" >Gramercy-Flatiron</MenuItem>
              <MenuItem eventKey="Midtown" >Midtown</MenuItem>
              <MenuItem eventKey="Soho" >Soho</MenuItem>
              <MenuItem eventKey="Tribeca" >Tribeca</MenuItem>
              <MenuItem eventKey="Union Square" >Union Square</MenuItem>
              <MenuItem eventKey="Upper East Side" >Upper East Side</MenuItem>
              <MenuItem eventKey="Upper West Side" >Upper West Side</MenuItem>
              <MenuItem eventKey="Lower East Side" >Lower East Side</MenuItem>
              <MenuItem eventKey="Hell's Kitchen" >Hell's Kitchen</MenuItem>
            </DropdownButton>
          </ButtonGroup><br/><br/>

          <ButtonToolbar>
            <Button bsStyle="primary" bsSize="large" type="submit" onClick={this.clickCreate}>Create Event</Button>
            <Button bsStyle="warning" bsSize="small" type="reset" onClick={this.clickCancel}>Nevermind</Button>
          </ButtonToolbar><br/>
        </Form>
      </div>

    )
  }
};

export default Host;
