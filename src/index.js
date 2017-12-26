import React from 'react';
import { render } from 'react-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App'
import Matrix from "./Matrix";
import Myself from "./MySelf.js"
import {Router,Route,browserHistory} from 'react-router'

render((
    <Router history={browserHistory}>
        <Route path="/" component={Matrix}/>
        <Route path="/cxy" component={Myself}/>

    </Router>
), document.getElementById('root'));

render((
   <App/>
), document.getElementById('root'));


registerServiceWorker();
