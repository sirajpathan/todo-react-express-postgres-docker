import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from "history";

import { Provider } from 'react-redux';
import store from './store/store';

import Todo from './components/TodoComponent/todo';
import NotFound from './components/NotFoundComponent/notfound';
import './index.css';

const app = document.getElementById('app');
const history = createBrowserHistory();
ReactDOM.render(
  <Provider store={store}>
    <div className="wrapper">
      <h2 className="title">Todo App</h2>
      <Router history={history}>
      <Route path="/" component={Todo}/>
      <Route path="/not-found" component={NotFound}/>
      </Router>
    </div>
  </Provider>,
app);
