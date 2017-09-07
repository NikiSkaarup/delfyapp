import React, { Component } from 'react';
import Header from './Header.js';
import Chat from './Chat.js';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Chat />
      </div>
    );
  }
}

export default App;
