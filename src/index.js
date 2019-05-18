import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';

import './index.css';

import Menu from './components/Menu';

import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './redux/reducers'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

const Teams = lazy(() => import('./Containers/Teams'));
const Matches = lazy(() => import('./Containers/Matches'));

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
            <Router>
                <Menu/>
                <Switch>
                    <Route path="/" exact component={Teams} />
                    <Route path="/partidos" exact component={Matches} />
                    <Route path="*" render={ () => {
                        return (<Redirect to="/" />)
                    } }/>
                </Switch>
            </Router>
        </Suspense>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
