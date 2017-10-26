import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Home.css';
import '../../css/Form.css';

/**
 * Front page which should allow users to create or join
 * an evaluation
 */
class Home extends Component {
    render() {
        return (
            <div className="home">
                <h1 className="title">Delfy</h1>
                <p className="subtitle">Create a new Evaluation<br /> or Join an existing</p>
                <Link to="/create" className="homebutton">Create</Link>
                <Link to="/join" className="homebutton">Join</Link>
            </div>
        );
    }
}

export default Home;
