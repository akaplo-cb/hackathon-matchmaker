import React, { Component } from 'react';
import './App.css';
import Login from "./Login/Login";
import MatchViewer from './MatchViewer/MatchViewer';

class App extends Component {
    state = { email: undefined, type: undefined, err: null };
  render() {
      const { email, type, err } = this.state;
    return (
      <div className="App">
          {
              (!email || !type || !!err) &&
                  <Login incomingMessage={err} onLoginClicked={ (user) => this.setState({ email: user.email, type: user.type }) }/>
          }
          {
              !!email && !!type && !err &&
                  <MatchViewer email={ email } type={ type } onError={ (err) => this.setState({ err: err }) } />
          }
      </div>
    );
  }
}

export default App;
