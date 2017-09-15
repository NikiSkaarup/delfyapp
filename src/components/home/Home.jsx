import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Home.css';
import '../../css/Form.css';

class Home extends Component {
    render() {
        return (
            <div className="home">
                <h1 className="title">Delfy</h1>
                <p className="subtitle">Create a new Evaluation<br/> or Join an existing</p>
                <Link to="/create" className="button">Create</Link>
                <Link to="/join" className="button">Join</Link>
            </div>
        );
    }
}

export default Home;
