import React, { Component } from 'react';
import ChatStore from '../data/ChatStore'
import '../styles/Chat.css';

class Chat extends Component {

    constructor() {
        super();

        this.state = {
            input: ""
        }
    }

    inputChange = (event) => {
        let input = this.state.input;
        input = event.target.value;

        this.setState({
            input: input
        });
    }

    submit = (evt) => {
        evt.preventDefault();
        ChatStore.sendMessage(this.state.input);
        this.setState({ input: "" })
    }

    render() {
        return (
            <div id='chat'>
                <div id='output'>
                    {ChatStore.getMessages().map((data, index) => {
                        return (<p key={index}>{data.caller}:{data.message}</p>);
                    })}
                </div>
                <form id='wstestform' onSubmit={this.submit}>
                    <input type='text' name='text' id='input'
                        autoComplete='off' autoFocus='true'
                        value={this.state.input} onChange={this.inputChange} />
                    <button type='submit' className='hidden'>Send</button>
                </form>
            </div>
        );
    }
}

export default Chat;
