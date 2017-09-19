import React from 'react';
import {DatePicker, FormGroup, ControlLabel} from "react-bootstrap-date-picker";

class Picker extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      date: new Date().toISOString()
    }

    this.handleChange = this.handleChange.bind(this);
  };
  handleChange(date, formatteddate) {
    this.setState({
      date: date, 
      formattedDate: formattedDate // Formatted String, ex: "11/19/2016" 
    });
  };
  componentDidUpdate() {
    var hiddenInputElement = document.getElementById("example-datepicker");
    console.log(hiddenInputElement.date); // ISO String, ex: "2016-11-19T12:00:00.000Z" 
    console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016" 
  };
  render() {
    return (
      <FormGroup>
        <ControlLabel>Choose Your Day</ControlLabel>
        <DatePicker id="example-datepicker" value={this.state.date} onChange={this.handleChange} />
      </FormGroup>
    )
  }
};

export default Picker;