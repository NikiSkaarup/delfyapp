import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../css/Home.css';
import InputGroup from '../InputGroup';

@inject('createStore')
@observer
class Feedback extends Component {
    changeTitle = e => this.props.createStore.setTitle(e.target.value);
    changeNum = e => this.props.createStore.setNum(e.target.value);
    changePositive = e => this.props.createStore.setPositive(e.target.value);
    changeNegative = e => this.props.createStore.setNegative(e.target.value);
    changeCheckbox = e => this.props.createStore.setCheckbox((e.target.value === "true" ? true : false));
    changeGeneral = e => this.props.createStore.setGeneral(e.target.value);

    submitFeedback = (event) => {
        event.preventDefault();

        console.log(this.props.createStore);
    }

    positiveFeedback = (numToRender, positive, val) => {
        let result = [];
        result.push(<h2 className="title q">{positive}</h2>);
        for (let i = 0; i < numToRender; i++) {
            result.push(
                <div>
                    <InputGroup id={"positive-" + i}
                        type="text"
                        x-num={i}
                        onChange={this.changeGeneral}
                        value={val} />
                </div >
            );
        }
        return result;
    }

    negativeFeedback = (numToRender, negative, val) => {
        let result = [];
        result.push(<h2 className="title q">{negative}</h2>);
        for (let i = 0; i < numToRender; i++) {
            result.push(
                <div>
                    <InputGroup id={"negative-" + i}
                        type="text"
                        x-num={i}
                        onChange={this.changeGeneral}
                        value={val} />
                </div >
            );
        }
        return result;
    }

    generalFeedback = (shouldRender, general, val) => {
        if (shouldRender) {
            return (
                <div>
                    <h2 className="title q">{general}</h2>
                    <InputGroup id="general"
                        type="text"
                        title="General feedback"
                        onChange={this.changeGeneral}
                        value={val} />
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
            general
        } = this.props.createStore;

        return (
            <form className="home">
                <h1 className="title">{title}</h1>


                {this.positiveFeedback(num, positive, "val")}
                {this.negativeFeedback(num, negative, )}

                {this.generalFeedback(checkbox, general, "val")}

                <button type="submit" onClick={this.submitFeedback}>Submit</button>
            </form>
        );
    }
}

export default Feedback;
