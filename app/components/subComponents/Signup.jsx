import React from 'react';
import {Button, Form, FormControl, FormGroup} from 'react-bootstrap';
import Axios from 'axios';

const SignupWarning = (props) => {
  return (
    <div className={props.message.class}>
      {props.message.message}
    </div>
  );
}

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      message: {
        class:'',
        message:''
      }
    }
  }

  handleUsernameChange (event) {
    this.setState({
      username: event.target.value
    })
  }

  handlePasswordChange (event) {
    this.setState({
      password: event.target.value
    })
  }

  checkUsernamePassword (event) {
    if ((this.state.username.length > 0) && (this.state.password.length > 0)) {
        this.props.onSignup(this.state.username, this.state.password)
    } else {
      this.setState({
        message: {
          class: 'failure',
          message:'Please enter a username and password and try again'
        }
      })
    }
  }

  getValidationState(value) {
    const length = value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  render() {
    return(
      <div>
         <Form >
          <FormGroup controlId="name" validationState={this.getValidationState(this.state.username)}>
            <FormControl
              type="text"
              value={this.state.username}
              placeholder="username"
              onChange={this.handleUsernameChange.bind(this)}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="name" validationState={this.getValidationState(this.state.password)}>
            <FormControl
              type="text"
              value={this.state.password}
              placeholder="password"
              onChange={this.handlePasswordChange.bind(this)}
            />
            <FormControl.Feedback />
          </FormGroup>
        <Button type="submit" value="Submit" onClick={this.checkUsernamePassword.bind(this)}>Create My Account</Button><br/>
        <SignupWarning message={this.state.message}/>
        </Form>
      </div>
      )
  }
};

export default Signup;
