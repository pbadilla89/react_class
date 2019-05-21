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

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSyncAlt, faPlus, faPencilAlt, faExclamationCircle, faGamepad } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'

library.add( faSyncAlt, faPlus, faPencilAlt, faTrashAlt, faExclamationCircle, faGamepad)

const Teams = lazy(() => import('./Containers/Teams'));
const Matches = lazy(() => import('./Containers/Matches'));
const Countries = lazy(() => import('./Containers/Countries'));
const Page404 = lazy(() => import('./Containers/404'));

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
            <Router>
                <Menu/>
                <Switch>
                    <Route path="/" exact component={Teams} />
                    <Route path="/partidos" exact component={Matches} />
                    <Route path="/Paices" exact component={Countries} />
                    <Route path="*" component={Page404}/>
                </Switch>
            </Router>
        </Suspense>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
