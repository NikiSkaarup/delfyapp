import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ChatStore from '../data/ChatStore';
import '../styles/Chat.css';

@observer
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

    scrollOutput = () => {
        setTimeout(() => {
            let target = document.getElementById('output');
            //console.log(target); // Spammy, figure out a better way to do this? wait probably not needed since this isn't a chat app....
            target.scrollTop = target.scrollHeight;
        }, 0);
    }

    render() {
        return (
            <div id='chat'>
                <div id='output' onChange={this.scrollOutput}>
                    {ChatStore.getMessages.map((data, index) => {
                        return (<p key={index}>{data.caller}: {data.message}</p>);
                    })}
                    {this.scrollOutput()}
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
