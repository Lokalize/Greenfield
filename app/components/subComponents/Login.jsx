import React from 'react';
import {Form, Button, FormControl, FormGroup} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  usernameChange(e) {
    this.setState({username: e.target.value})
  }

  passwordChange(e) {
    this.setState({password: e.target.value})
  }

  onSubmit(){
    this.props.onLogin(this.state.username, this.state.password)
  }

  getValidationState(key) {
    // if (this.state[key].length) return 'success';
    // else if (this.state[key].length > 25) return 'warning';
    // else { return 'error'; };
  };


  render() {
    return (
      <div className="modal-container">
        <Form >
          <FormGroup controlId="name" validationState={this.getValidationState(this.state.username)}>
            <FormControl
              type="text"
              value={this.state.username}
              placeholder="username"
              onChange={this.usernameChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="name" validationState={this.getValidationState(this.state.password)}>
            <FormControl
              type="password"
              value={this.state.password}
              placeholder="password"
              onChange={this.passwordChange}
            />
            <FormControl.Feedback />
          </FormGroup>
        </Form>
        <Button bsSize="lg" onClick={this.onSubmit}>
        Login
        </Button>
        <Link to="/signup">
          <Button className="create-account" bsSize="lg" onClick={() => {<Redirect to="/signup" />}}>
            Create Account
          </Button>
        </Link>
      </div>
    )
  }
};

export default Login;


// 'Create Account' button might need to be moved to Signup.jsx for modularity
