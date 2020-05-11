import React from 'react';
import '../style/App.css';
import Login from '../component/Login';
import Home from '../component/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
      </div>
    </Router>
  );
}

export default App;
