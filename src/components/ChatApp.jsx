import React, { Component } from 'react';
import Header from './Header';
import Chat from './Chat';
import '../css/ChatApp.css';

class ChatApp extends Component {
  render() {
    return (
      <div className="chatapp">
        <Chat />
      </div>
    );
  }
}

export default ChatApp;
