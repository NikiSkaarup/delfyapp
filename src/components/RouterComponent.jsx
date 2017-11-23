import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react';
import Header from './Header';
import Home from './home/Home';
import Create from './host/Create';
import Monitor from './host/Monitor';
import Results from './host/Results';
import Join from './participant/Join';
import Feedback from './participant/Feedback';
import Voting from './participant/Voting';
import createStore from '../data/CreateStore';
import joinStore from '../data/JoinStore';

const stores = {
    createStore,
    joinStore
};
class RouterComponent extends Component {

    render() {
        return (
            <Provider {...stores}>
                <BrowserRouter>
                    <div style={{ height: "100%" }}>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/create" component={Create} />
                            <Route path="/monitor" component={Monitor} />
                            <Route path="/results" component={Results} />
                            <Route path="/join" component={Join} />
                            <Route path="/feedback" component={Feedback} />
                            <Route path="/voting" component={Voting} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default RouterComponent;
