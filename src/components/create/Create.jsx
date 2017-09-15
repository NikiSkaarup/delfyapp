import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../../css/Home.css';
import InputGroup from '../InputGroup';

class Create extends Component {

    render() {
        return (
            <div className="home">
                <h1 className="title">Delfy</h1>
                <p className="subtitle">Fill out the form below andthen we will<br />create the evaluation template for you.</p>

                <InputGroup id="title"
                    type="text"
                    title="title" />

                <InputGroup id="num"
                    type="number"
                    title="Feedback per question" />

                <InputGroup id="positive"
                    type="text"
                    title="Positive feedback" />

                <InputGroup id="negative"
                    type="text"
                    title="Negative feedback" />

                <InputGroup id="checkbox"
                    type="text"
                    title="Add general comments" />

                <InputGroup id="general"
                    type="text"
                    title="General feedback" />

                <button>Create</button>
            </div>
        );
    }
}

export default Create;
