import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../css/Home.css';
import '../../css/Host.css';
import '../../css/PurdyBox.css';

@inject('createStore')
@observer
class Monitor extends Component {

    setFeedbackDone = () => this.props.createStore.setFeedbackDone();
    endEvaluation = () => {
        // end evalution and see results!
        this.props.createStore.sort('positive');
        this.props.createStore.sort('negative');
        this.props.createStore.sort('general');
        this.props.history.push('/results');
    };

    render() {
        const {
            title,
            participants,
            feedbackReceived,
            joinCode
        } = this.props.createStore;

        return (
            <div className="home">
                <h1 className="title">{title}</h1>
                <h2 className="title q">go to https://delfy.skaarup.io</h2>
                <h2 className="title code">{joinCode}</h2>
                <p className="subtitle">Enter this code to join evaluation.</p>
                <div className="monitor-wrapper">
                    <div>
                        <h3>Participants</h3>
                        <div>{participants.length}</div>
                    </div>
                    <div>
                        <h3>Feedback Received</h3>
                        <div>{feedbackReceived}</div>
                    </div>
                </div>

                <div className="purdy_box">
                    click me first
                    <button onClick={this.setFeedbackDone}>Stop receiving feedback</button>
                    click me second
                    <button onClick={this.endEvaluation}>End evaluation and see results</button>
                </div>
            </div>
        );
    }
}

export default Monitor;
