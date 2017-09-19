import React from 'react';
import { Form, FormGroup, FormControl, PageHeader, ButtonToolbar, Button } from 'react-bootstrap';
// import Picker from './DatePicker.jsx';

class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: '',
      date: '',
      location: ''
    },

    this.nameChange = this.nameChange.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.locationChange = this.locationChange.bind(this);
    this.clickCreate = this.clickCreate.bind(this);
    this.clickCancel = this.clickCancel.bind(this);

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
    this.setState({ type: e.target.value });
  };

  dateChange(e) {
    this.setState({ date: e.target.value });
  };

  locationChange(e) {
    this.setState({ location: e.target.value });
  };

  clickCreate() {
    //TODO: helper function add event -- POST
    this.setState({
      name: '',
      type: '',
      date: '',
      location: ''
    })
  };

  clickCancel() {
    this.setState({
      name: '',
      type: '',
      date: '',
      location: ''
    })
  };

  render() {
    return (
      <div>
        <Form>
          
          <FormGroup controlId="name" validationState={this.getValidationSate(this.state.name)}>
            <FormControl
              type="text"
              value={this.state.name}
              placeholder="Name"
              onChange={this.nameChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="type" validationState={this.getValidationSate(this.state.type)}>
            <FormControl
              type="text"
              value={this.state.type}
              placeholder="Type of Event"
              onChange={this.typeChange}
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
          <FormGroup controlId="location" validationState={this.getValidationSate(this.state.location)}>
            <FormControl
              type="text"
              value={this.state.location}
              placeholder="Location of Event"
              onChange={this.locationChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <ButtonToolbar>
            <Button bsStyle="primary" bsSize="large" type="submit" onClick={this.clickCreate}>Create Event</Button>
            <Button bsStyle="warning" bsSize="small" type="reset" onClick={this.clickCancel}>Nevermind</Button>
          </ButtonToolbar>
        </Form>
      </div>
    )
  }
};

export default Host;