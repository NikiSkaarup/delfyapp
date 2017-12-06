import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import '../../css/Home.css';
import '../../css/Voting.css';

@inject('joinStore')
@observer
class Voting extends Component {
    changeFeedback = e => this.props.joinStore.setFeedback(e);

    dismissFeedback = (e) => {
        const id = e.target.getAttribute('data-id');
        const type = e.target.getAttribute('data-type');
        this.props.joinStore.dismissFeedback(id, type);
    };

    approveFeedback = (e) => {
        const id = e.target.getAttribute('data-id');
        const type = e.target.getAttribute('data-type');
        this.props.joinStore.approveFeedback(id, type);
    };

    renderFeedbackContainer = (title, d) => {
        console.log(toJS(d));
        let result = [];
        result.push(<h2 key='0' className="title q">{title}</h2>);
        let temp = [];

        for (let i = 0; i < d.length; i++) {
            console.log('...');
            const item = d[i];
            if (item.determined !== undefined) continue;
            console.log(`${title} - ${item}`);
            temp.push(
                <div className="feedback" key={i}>
                    <div
                        data-type={item.type}
                        data-id={item.id}
                        className="left"
                        onClick={this.dismissFeedback}
                    >
                        X
                    </div>
                    <p>{item.val}</p>
                    <div
                        data-type={item.type}
                        data-id={item.id}
                        className="right"
                        onClick={this.approveFeedback}
                    >
                        ✓
                    </div>
                </div>
            );
        }
        console.log(toJS(temp));
        result.push(<div key='1' className="feedbackContainer">{temp}</div>);

        return result;
    }

    render() {
        const {
            title,
            positive,
            negative,
            general,
            allFeedback,
            votesSent
        } = this.props.joinStore;
        const data = allFeedback.data;
        return (<div className="home">
            {(!votesSent) && (<div>
                <h1 className="title">{title}</h1>
                <p style={{ paddingBottom: "1rem" }}>Please vote for all feedback you agree with.
                If you dont agree press the X to remove from view.</p>
                {this.renderFeedbackContainer(positive, data.positive)}
                {this.renderFeedbackContainer(negative, data.negative)}
                {general && this.renderFeedbackContainer(general, data.general)}
            </div>)
            }
            {(votesSent) && (<div>
                <h1 className="title">{title}</h1>
                <p style={{ paddingBottom: "1rem" }}>Your voting is done.
                The creator of the evaluation will display the results when everyone is done voting.</p>
                <p style={{ paddingBottom: "1rem" }}>
                    Thank you for using Delfy!</p>
            </div>)
            }
        </div>
        );
    }
}

export default Voting;
