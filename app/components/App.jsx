import React from 'react';
import { Switch, Route, BrowserRouter, DefaultRoute, Redirect } from 'react-router-dom';
import Home from './Home.jsx';
import Join from './Join.jsx';
import Create from './Create.jsx';
import Header from './subComponents/Header.jsx';
// import Host from './subComponents/Host.jsx';
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
      username: ''
    })
  }

  requireAuth() {
    return !this.state.isLoggedIn
  }

  render() {
    return (
      <div>
        <Header onLogout={this.onLogout} isLoggedIn={this.state.isLoggedIn}/>
        <Switch>
          <Route path='/signup' render={() => (
            this.requireAuth() ? (
            <Signup onSignup={this.onSignup.bind(this)} />
          ) : (
            <Redirect to="/home"/>
          )
          )}/>

          <Route path='/login' render={() => (
            this.requireAuth() ? (
            <Login onLogin={this.onLogin.bind(this)}/>
          ) : (
            <Redirect to="/home" />
          )
          )}/>

          <Route exact path='/home' render={() => (
            this.requireAuth() ? (
              <Redirect to="/login"/>
            ) : (
              <Home username={this.state.username} />

            )
          )}/>

          <Route exact path='/join' render={() => (
            this.requireAuth() ? (
              <Redirect to="/login"/>
            ) : (
              <Join user_id={this.state.uid}/>
            )
          )}/>

          <Route exact path='/host' render={() => (
            this.requireAuth() ? (
              <Redirect to="/login"/>
            ) : (
              <Create userid={this.state.uid}/>
            )
          )}/>
          <Route exact path='*' render={() => (
            <Redirect to="/login"/>
          )}/>
        </Switch>
      </div>
    )
  }
};

export default App;
