import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import '../css/Header.css';

class Header extends Component {
    render() {
        return (
            <header className='header'>
                <div>
                    <div className='logo'>
                        <Link to="/" >
                            <img src={logo} className='App-logo' alt='logo' />
                        </Link>
                    </div>
                    <Link className='home-link' to="/" >Delfy</Link>
                </div>
            </header>
        );
    }
}

export default Header;
