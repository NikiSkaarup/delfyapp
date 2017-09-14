import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Header from './Header';
import Home from './home/Home';
import Create from './create/Create';
import ChatApp from './ChatApp';

class RouterComponent extends Component {


    render() {
        return (
            <Router>
                <div style={{height:"100%"}}>
                    <Header />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/create" component={Create} />
                    <Route exact path="/join" component={Home} />
                    <Route path="/chatapp" component={ChatApp} />
                </div>
            </Router>
        );
    }


}

export default RouterComponent;
