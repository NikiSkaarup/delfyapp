import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import '../../css/Home.css'

class Create extends Component {
    render() {
        return (
            <div className="home">
                <h1 className="title">Delfy</h1>
                <p className="subtitle">Create a new Evaluation</p>
                <Link to="/create" className="homebutton">Create</Link>
                <Link to="/join" className="homebutton">Join</Link>
            </div>
        );
    }
}

export default Create;
