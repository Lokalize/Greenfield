import React from 'react';
import Header from './subComponents/Header.jsx';
import Search from './subComponents/Search.jsx';

class Join extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header />,
      <Search user_id={this.props.user_id}/>
    )
  }
}

export default Join;
