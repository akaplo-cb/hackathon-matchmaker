import React, { Component } from 'react';
import './App.css';
import Login from "./Login/Login";
import MatchViewer from './MatchViewer/MatchViewer';

class App extends Component {
    state = { email: undefined, type: undefined };
  render() {
      const { email, type } = this.state;
    return (
      <div className="App">
          {
              !email &&
                  <Login onLoginClicked={ (user) => this.setState({ email: user.email, type: user.type }) }/>
          }
          {
              !!email &&
                  <MatchViewer email={ email } type={ type } />
          }
      </div>
    );
  }
}

export default App;
