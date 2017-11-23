import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../css/Home.css';
import '../../css/Host.css';

@inject('createStore')
@observer
class Monitor extends Component {

    setFeedbackDone = (event) => this.props.createStore.setFeedbackDone();
    endEvaluation = () => {
        // end evalution and see results!
        this.props.history.push('/results');
    };

    render() {
        const {
            title,
            participants,
            feedback,
            joinCode
        } = this.props.createStore;

        return (
            <div>
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

                <button onClick={this.setFeedbackDone}>Stop receiving feedback(shouldn't be needed.)</button>
                <button onClick={this.endEvaluation}>End evaluation and see results</button>
            </div>
        );
    }
}

export default Monitor;
