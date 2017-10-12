import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../css/Home.css';
import InputGroup from '../InputGroup';

@inject('joinStore')
@observer
class Feedback extends Component {
    changePositive = e => this.props.joinStore.setPositive(e);
    changeNegative = e => this.props.joinStore.setNegative(e);
    changeFeedback = e => this.props.joinStore.setFeedback(e);

    submitFeedback = (e) => {
        e.preventDefault();

        console.log(this.props.joinStore);
    }

    positiveFeedback = (numToRender, positive, feedback) => {
        let result = [];
        result.push(<h2 key='0' className="title q">{positive}</h2>);
        for (let i = 1; i <= numToRender; i++) {
            let id = `positive-${i}`;
            let data = feedback.data.find((el) => el.id === id);
            let feedbackValue = '';
            let feedbackObj = {
                id: id,
                type: 'positive',
                value: feedbackValue
            };
            if(data) {
                feedbackObj = data;
                feedbackValue = data.value;
            } else {
                this.props.joinStore.addFeedback(feedbackObj);
            }
            result.push(
                <div key={i}>
                    <InputGroup id={id}
                        type="text"
                        x-num={i}
                        onChange={this.changeFeedback}
                        value={feedbackValue} />
                </div >
            );
        }
        return result;
    }

    negativeFeedback = (numToRender, negative, feedback) => {
        let result = [];
        result.push(<h2 key='0' className="title q">{negative}</h2>);
        for (let i = 1; i <= numToRender; i++) {
            let id = `negative-${i}`;
            let data = feedback.data.find((el) => el.id === id);
            let feedbackValue = '';
            let feedbackObj = {
                id: id,
                type: 'negative',
                value: feedbackValue
            };
            if(data) {
                feedbackObj = data;
                feedbackValue = data.value;
            } else {
                this.props.joinStore.addFeedback(feedbackObj);
            }
            result.push(
                <div key={i}>
                    <InputGroup id={id}
                        type="text"
                        x-num={i}
                        onChange={this.changeFeedback}
                        value={feedbackValue} />
                </div >
            );
        }
        return result;
    }

    generalFeedback = (general, feedback) => {
        
        let id = 'general';
        let data = feedback.data.find((el) => el.id === id);
        let feedbackValue = '';
        let feedbackObj = {
            id: id,
            type: 'general',
            value: feedbackValue
        };
        if(data) {
            feedbackObj = data;
            feedbackValue = data.value;
        } else {
            this.props.joinStore.addFeedback(feedbackObj);
        }
        return (
            <div>
                <h2 className="title q">{general}</h2>
                <InputGroup id={id}
                    type="text"
                    title="General feedback"
                    onChange={this.changeFeedback}
                    value={feedbackValue} />
            </div >
        );
    }

    render() {
        const {
            title,
            num,
            positive,
            negative,
            checkbox,
            general,
            feedback,
        } = this.props.joinStore;

        return (
            <form className="home">
                <h1 className="title">{title}</h1>

                {this.positiveFeedback(num, positive, feedback)}
                {this.negativeFeedback(num, negative, feedback)}

                {checkbox && this.generalFeedback(general, feedback)}

                <button type="submit" onClick={this.submitFeedback}>Submit</button>
            </form>
        );
    }
}

export default Feedback;
