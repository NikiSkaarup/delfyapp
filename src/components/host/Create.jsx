import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../css/Home.css';
import InputGroup from '../InputGroup';

@inject('createStore')
@observer
class Create extends Component {
    changeTitle = e => this.props.createStore.setTitle(e.target.value);
    changeNum = e => this.props.createStore.setNum(e.target.value);
    changePositive = e => this.props.createStore.setPositive(e.target.value);
    changeNegative = e => this.props.createStore.setNegative(e.target.value);
    changeCheckbox = e => {
        this.props.createStore.setCheckbox((e.target.checked ? true : false));
        //console.log(e.target.checked); //Debug code
    }
    changeGeneral = e => this.props.createStore.setGeneral(e.target.value);

    createEvaluation = (event) => {
        event.preventDefault();
        this.props.createStore.generateCode();
        //CreateStore.updateEvaluation(this.state.evaluation);
        this.props.history.push('/monitor');
        console.log(this.props.createStore);
    }

    generalFeedback = (shouldRender, val) => {
        if (shouldRender) {
            return (
                <InputGroup id="general"
                    type="text"
                    title="General feedback"
                    onChange={this.changeGeneral}
                    value={val} />
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
                <h1 className="title">Create new evaluation</h1>
                <p className="subtitle">Fill out the form below and then we will<br />create the evaluation template for you.</p>

                <InputGroup id="title"
                    type="text"
                    title="Title"
                    onChange={this.changeTitle}
                    value={title} />

                <InputGroup id="num"
                    type="number"
                    title="Feedback per question"
                    onChange={this.changeNum}
                    value={num} />

                <InputGroup id="positive"
                    type="text"
                    title="Positive feedback"
                    onChange={this.changePositive}
                    value={positive} />

                <InputGroup id="negative"
                    type="text"
                    title="Negative feedback"
                    onChange={this.changeNegative}
                    value={negative} />

                <div className="input-group">
                    <label className='nosel' htmlFor="checkbox">Enable general feedback</label>
                    <input
                        type="checkbox"
                        name="checkbox"
                        id="checkbox"
                        onChange={this.changeCheckbox}
                        value={checkbox} />
                </div>

                {this.generalFeedback(checkbox, general)}

                <button type="submit" onClick={this.createEvaluation}>Create</button>
            </form>
        );
    }
}

export default Create;
