import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../css/Home.css';
import '../../css/Host.css';

@inject('createStore')
@observer
class Create extends Component {

    
    createEvaluation = (event) => {
        event.preventDefault();
        //CreateStore.updateEvaluation(this.state.evaluation);
        console.log(this.props.createStore);
    }

    render() {
        const {
            title,
            participants,
            feedback,
            joinCode
        } = this.props.createStore;

        return (
            <form className="home">
                <h1 className="title">{title}</h1>
                <h2 className="title code">{joinCode}</h2>
                <p className="subtitle">Enter this code to join evaluation.</p>
                <div className="monitor-wrapper">
                    <div>
                        <h3>Participants</h3>
                        <div>{participants.length}</div>
                    </div>
                    <div>
                        <h3>Feedback Received</h3>
                        <div>{feedback.length}</div>
                    </div>
                </div>

                <button type="submit" onClick={this.createEvaluation}>See results</button>
            </form>
        );
    }
}

export default Create;
