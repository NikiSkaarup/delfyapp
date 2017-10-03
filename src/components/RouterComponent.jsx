import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import Header from './Header';
import Home from './home/Home';
import Create from './host/Create';
import Monitor from './host/Monitor';
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
                        <Route path="/monitor" component={Monitor} />
                        <Route path="/join" component={Home} />
                        <Route path="/chatapp" component={ChatApp} />
                    </div>
                </Router>
            </Provider>
        );
    }


}

export default RouterComponent;
