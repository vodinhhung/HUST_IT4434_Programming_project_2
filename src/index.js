import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import * as serviceWorker from './main/serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {initStore} from './store';
import Home from './component/Home';
import Login from './component/Login';
import UserDetail from './component/UserDetail';
import Cart from './component/Cart';


const store = initStore()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/userdetail' component={UserDetail}/>
        <Route path='/cart' component={Cart}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
