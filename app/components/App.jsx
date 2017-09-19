import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Join from './Join.jsx';
import Header from './subComponents/Header.jsx';
import Host from './subComponents/Host.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/join' component={Join}/>
          <Route exact path='/host' component={Host}/>
        </Switch>
      </div>
    )
  }
};

export default App;
