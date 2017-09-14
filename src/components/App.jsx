import React, { Component } from 'react';
import Header from './Header';
import Chat from './Chat';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Chat />
      </div>
    );
  }
}

export default App;
