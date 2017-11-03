import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../css/Home.css';
import InputGroup from '../InputGroup';

@inject('joinStore')
@observer
class Feedback extends Component {

    /**
     * shared by all input fields for feedback
     */
    changeFeedback = e => this.props.joinStore.setFeedback(e);

    /**
     * sends feedback and transfers user to new page
     */
    submitFeedback = (e) => {
        e.preventDefault();

        console.log(this.props.joinStore);
        this.props.joinStore.submitFeedback();
        this.props.history.push('/voting');
    }

    /**
     * returns the a group of input fields with a header
     */
    positiveFeedback = (numToRender, positive, d) => {
        let result = [];
        result.push(<h2 key='0' className="title q">{positive}</h2>);
        for (let i = 0; i < numToRender; i++) {
            let id = `p-${i}`;
            let data = d.find((el) => el.id === id);
            if (data) {
                result.push(
                    <div key={(i + 1)}>
                        <InputGroup id={id}
                            type="textarea"
                            onChange={this.changeFeedback}
                            value={data.val} />
                    </div >
                );
            }
        }
        return result;
    }

    /**
     * returns the a group of input fields with a header
     */
    negativeFeedback = (numToRender, negative, d) => {
        let result = [];
        result.push(<h2 key='0' className="title q">{negative}</h2>);
        for (let i = 0; i < numToRender; i++) {
            let id = `n-${i}`;
            let data = d.find((el) => el.id === id);
            if (data) {
                result.push(
                    <div key={(i + 1)}>
                        <InputGroup id={id}
                            type="textarea"
                            onChange={this.changeFeedback}
                            value={data.val} />
                    </div >
                );
            }
        }
        return result;
    }

    /**
     * returns the an input field with a header
     */
    generalFeedback = (general, d) => {
        let id = 'general';
        let data = d.find((el) => el.id === id);
        if (data) {
            return (
                <div>
                    <h2 className="title q">{general}</h2>
                    <InputGroup id={id}
                        type="textarea"
                        onChange={this.changeFeedback}
                        value={data.val} />
                </div >
            );
        }
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
        const data = feedback.data;
        return (
            <form className="home">
                <h1 className="title">{title}</h1>

                {this.positiveFeedback(num, positive, data)}
                {this.negativeFeedback(num, negative, data)}

                {checkbox && this.generalFeedback(general, data)}

                <button type="submit" onClick={this.submitFeedback}>Submit</button>
            </form>
        );
    }
}

export default Feedback;
