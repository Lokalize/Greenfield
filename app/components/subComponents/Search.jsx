import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button, ButtonGroup, DropdownButton, MenuItem, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import listElements from '../../lib/idReferencesForApi.js'


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
      <div>
      <h1 className="JoinEventHeader"> Join an Event! </h1> <br></br>
      <WarningBanner message={this.state.message}/>
      <Form className="EventForm">
        <FormGroup controlId="formDate" className="EventFormField">
          <FormControl
            type="date"
            value={this.state.date}
            onChange={this.dateChange}
            placeholder="What date are you available?" />
        </FormGroup>
        <ButtonGroup>
          <DropdownButton
            title={this.state.address}
            id="bg-nested-dropdown"
            onSelect={this.addressChange}
            className="EventFormField"
          >
            {Object.keys(listElements.localities).sort().map(key => {
              return <MenuItem eventKey={key} >{key}</MenuItem>
            })}
            <MenuItem eventKey="" >No Preference</MenuItem>
          </DropdownButton>
        </ButtonGroup><br/><br/>
      <ButtonGroup>
        <DropdownButton
          title={this.state.dinnerType}
          id="bg-nested-dropdown"
          onSelect={this.dinnerTypeChange}
          className="EventFormField"
        >
          {Object.keys(listElements.cuisines).sort().map(key => {
            return <MenuItem eventKey={key} >{key}</MenuItem>
          })}
          <MenuItem eventKey="" >No Preference</MenuItem>
        </DropdownButton>
      </ButtonGroup><br/><br/>
    <Button className="EventFormField" type="submit" onClick={this.handleSubmit}>
          Find My Event
        </Button>
      </Form>
      </div>
    )
  }
};



export default Search;
