import React from 'react';
import {Button} from 'react-bootstrap';
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

  render() {
    return(
      <div>
          Username: <input type="text" value={this.state.username} onChange={this.handleUsernameChange.bind(this)}/>
          Password: <input type="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
        <Button type="submit" value="Submit" onClick={this.checkUsernamePassword.bind(this)}>Create My Account</Button><br/>
        <SignupWarning message={this.state.message}/>
      </div>
      )
  }
};

export default Signup;
