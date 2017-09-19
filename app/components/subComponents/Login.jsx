import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div className="modal-container">
        <Button
          bsSize="medium"
        >
          Create Account
        </Button>
        <Button
          bsSize="medium"
        >
          Login
        </Button>
        <Modal>
          <Modal.Header closeButton>
            
        </Modal>
      </div>
    )
  }
};

export default Login;