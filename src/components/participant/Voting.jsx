import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../css/Home.css';
import '../../css/Voting.css';

@inject('joinStore')
@observer
class Voting extends Component {
    changeFeedback = e => this.props.joinStore.setFeedback(e);

    submitFeedback = (e) => {
        e.preventDefault();

        console.log(this.props.joinStore);
        //this.props.joinStore.submitFeedback();
        //this.props.history.push('/voting');
    }

    positiveFeedback = (numToRender, positive, d) => {
        let result = [];
        result.push(<h2 key='0' className="title q">{positive}</h2>);
        for (let i = 0; i < numToRender; i++) {
            let id = `p-${i}`;
            let data = d.find((el) => el.id === id);
            if (data) {
                result.push(
                    <div key={(i + 1)}>
                        {
                            //DO LOTS OF NEW STUFF HERE!!!!!!!!!!!!!
                        }
                    </div >
                );
            }
        }
        return result;
    }

    negativeFeedback = (numToRender, negative, d) => {
        let result = [];
        result.push(<h2 key='0' className="title q">{negative}</h2>);
        for (let i = 0; i < numToRender; i++) {
            let id = `n-${i}`;
            let data = d.find((el) => el.id === id);
            if (data) {
                result.push(
                    <div key={(i + 1)}>
                        {
                            //DO LOTS OF NEW STUFF HERE!!!!!!!!!!!!!
                        }
                    </div >
                );
            }
        }
        return result;
    }

    generalFeedback = (general, d) => {
        let id = 'general';
        let data = d.find((el) => el.id === id);
        if (data) {
            return (
                <div>
                    {
                        //DO LOTS OF NEW STUFF HERE!!!!!!!!!!!!!
                    }
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
                <p>Please choose the feedback you agree with and press submit when done.</p>

                {this.positiveFeedback(num, positive, data)}
                {this.negativeFeedback(num, negative, data)}

                {checkbox && this.generalFeedback(general, data)}


                {
                    //example of feedback voting box
                }

                <div className="feedbackContainer">
                    <div className="feedback">
                        <div className="left"> X</div>
                        <p>feedback vote box demo!</p>
                        <div className="right"> ✓</div>
                    </div>
                    <div className="feedback">
                        <div className="left"> X</div>
                        <p>feedback vote box demo!</p>
                        <div className="right"> ✓</div>
                    </div>
                    <div className="feedback">
                        <div className="left"> X</div>
                        <p>feedback vote box demo!</p>
                        <div className="right"> ✓</div>
                    </div>
                </div>

                <button type="submit" onClick={this.submitFeedback}>Submit</button>
            </form>
        );
    }
}

export default Voting;
