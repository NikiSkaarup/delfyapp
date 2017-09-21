import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'mobx-react';
import Header from './Header';
import Home from './home/Home';
import Create from './create/Create';
import createStore from '../data/CreateStore';
import ChatApp from './ChatApp';

const stores = {
    createStore
};
class RouterComponent extends Component {


    render() {
        return (
            <Provider {...stores}>
                <Router>
                    <div style={{ height: "100%" }}>
                        <Header />
                        <Route exact path="/" component={Home} />
                        <Route path="/create" component={Create} />
                        <Route path="/join" component={Home} />
                        <Route path="/chatapp" component={ChatApp} />
                    </div>
                </Router>
            </Provider>
        );
    }


}

export default RouterComponent;
