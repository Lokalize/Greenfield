import React from 'react';
import { Switch, Route, BrowserRouter, DefaultRoute, Redirect } from 'react-router-dom';
import Home from './Home.jsx';
import Join from './Join.jsx';
import Create from './Create.jsx';
import Header from './subComponents/Header.jsx';
import Login from './subComponents/Login.jsx';
import axios from 'axios';
import Signup from './subComponents/Signup.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
      uid:''
    }
    this.requireAuth = this.requireAuth.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  onSignup(username, password) {
    axios.post('/api/signup', {
      username: username,
      password: password
    })
    .then((res) => {
      console.log(res)
      if (res.data) {
        this.setState({
          isLoggedIn: true,
          username: username,
          uid: parseInt(res.data)
        })
      } else {
        this.setState({
          isLoggedIn: false,
          username: ''
        })
      }
    })
  }

  onLogin (username, password){
    axios.post('/api/login',{
      username: username,
      password: password
    })
    .then((res) => {
      if (res.data) {
        this.setState({
          isLoggedIn: true,
          username: username,
          uid: res.data
        })
      }
    })
  }

  onLogout() {
    this.setState({
      isLoggedIn: false,
      username: '',
      uid:''
    })
  }

  requireAuth() {
    return !this.state.isLoggedIn
  }

  routes(reRoutePath, isAuthReq, isAuthNotReq){
    return (
      <Route path={reRoutePath} render={() => (
        this.requireAuth() ? (
        isAuthReq
      ) : (
        isAuthNotReq
      )
      )}/>
    )
  }

  render() {
    return (
      <div>
        <Header onLogout={this.onLogout} isLoggedIn={this.state.isLoggedIn}/>
        <Switch>
          {this.routes("/signup", <Signup onSignup={this.onSignup.bind(this)} />, <Redirect to="/home" />)}
          {this.routes("/login", <Login onLogin={this.onLogin.bind(this)}/>, <Redirect to="/home" />)}
          {this.routes("/home", <Redirect to="/login"/>, <Home username={this.state.username} />)}
          {this.routes('/join', <Redirect to="/login"/>, <Join user_id={this.state.uid}/>)}
          {this.routes('/host', <Redirect to="/login"/>, <Create userid={this.state.uid}/>)}
          <Route exact path='*' render={() => (
            <Redirect to="/login"/>
          )}/>
        </Switch>
      </div>
    )
  }
};

export default App;
