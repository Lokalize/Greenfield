import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button, ButtonGroup, DropdownButton, MenuItem, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


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


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: 'Locality',
      date: '',
      emailValid: false,
      passwordValid: false,
      formValid: false,
      dinnerType: 'Cuisine',
      message: false
    }
    this.dinnerTypeChange = this.dinnerTypeChange.bind(this)
    this.dateChange = this.dateChange.bind(this)
    this.addressChange = this.addressChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    let dinnerType = this.state.dinnerType;
    let locality = this.state.address
    if (dinnerType === 'Cuisine'){
      dinnerType = ''
    }
    if (locality === 'Locality'){
      locality = ''
    }
    axios.post('/api/search', {
      user_id: this.props.user_id,
      address: locality,
      date: this.state.date,
      dinnerType: dinnerType
    })
    .then(data => {
      this.setState({message: data.data})
    })
  }

  dinnerTypeChange(eventKey, e) {
    this.setState({ dinnerType: eventKey });
  };

  dateChange(e) {
    this.setState({ date: e.target.value });
  };

  addressChange(eventKey, e) {
    this.setState({ address: eventKey });
  };

  // onSubmit={this.handleSubmit.bind(this)}
  render() {
    return (
      <Form inline>
        <FormGroup controlId="formDate">
          <ControlLabel>Date</ControlLabel><br />
          <FormControl
            type="date"
            value={this.state.date}
            onChange={this.dateChange}
            placeholder="What date are you available?" />
        </FormGroup>
        <br /><br/>
        <ButtonGroup>
          <DropdownButton
            title={this.state.address}
            id="bg-nested-dropdown"
            onSelect={this.addressChange}
          >
            <MenuItem eventKey="Chelsea" >Chelsea</MenuItem>
            <MenuItem eventKey="East Village" >East Village</MenuItem>
            <MenuItem eventKey="Financial District" >Financial District</MenuItem>
            <MenuItem eventKey="Flatiron" >Flatiron</MenuItem>
            <MenuItem eventKey="Gramercy" >Gramercy</MenuItem>
            <MenuItem eventKey="Greenwich Village" >Greenwich Village</MenuItem>
            <MenuItem eventKey="Hell's Kitchen" >Hells Kitchen</MenuItem>
            <MenuItem eventKey="Lower East Side" >Lower East Side</MenuItem>
            <MenuItem eventKey="Lower West Side" >Lower West Side</MenuItem>
            <MenuItem eventKey="Midtown" >Midtown</MenuItem>
            <MenuItem eventKey="Soho" >Soho</MenuItem>
            <MenuItem eventKey="Tribeca" >Tribeca</MenuItem>
            <MenuItem eventKey="Union Square" >Union Square</MenuItem>
            <MenuItem eventKey="Upper East Side" >Upper East Side</MenuItem>
            <MenuItem eventKey="Upper West Side" >Upper West Side</MenuItem>
            <MenuItem eventKey="West Village" >West Village</MenuItem>
            <MenuItem eventKey="" >No Preference</MenuItem>
          </DropdownButton>
        </ButtonGroup><br/><br/>
      <ButtonGroup>
        <DropdownButton
          title={this.state.dinnerType}
          id="bg-nested-dropdown"
          onSelect={this.dinnerTypeChange}
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
        <Button type="submit" onClick={this.handleSubmit}>
          Find My Event
        </Button>
        <WarningBanner message={this.state.message}/>
      </Form>
    )
  }
};



export default Search;
