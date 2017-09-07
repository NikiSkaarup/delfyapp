import React, { Component } from 'react';
import logo from '../logo.png';
import '../styles/Header.css';

class Header extends Component {
    render() {
        return (
            <header className='header'>
                <div>
                    <div className='logo'>
                        <img src={logo} className='App-logo' alt='logo' />
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
