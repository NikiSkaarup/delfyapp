import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './css/index.css';
import RouterComponent from './components/RouterComponent';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RouterComponent />, document.getElementById('root'));
registerServiceWorker();
