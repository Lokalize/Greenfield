import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      date: '',
      dinnerType: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
    axios.post('/search', {
      address: [40.750542, -73.976568],
      date: this.state.date,
      dinnerType: this.state.dinnerType
    })
  }

  handleChange(event){
    let property = event.target.className;
    let state = {};
    state[property] = event.target.value;
    this.setState(state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
      Enter Address: <input type = "text" className='address' onChange={this.handleChange}/><br/>
      Select Dinner Type: <input list="food" className='dinnerType' onChange={this.handleChange}/>
      <datalist id="food">
        <option value="Seafood"/>
        <option value="Steak"/>
        <option value="Chicken"/>
        <option value="Vegetarian"/>
        <option value="No Preference"/>
      </datalist><br/>
      Select Date: <input type = "date" className='date' onChange={this.handleChange}/><br/>
      <input type="submit"/>
      </form>
    )
  }
};

export default Search;
