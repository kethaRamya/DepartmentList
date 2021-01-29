import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './LoginPage'
import ListData from './ListData'
function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
      <Route path="/list" component={ListData} />
      <Route path="/" component={Login} />
      </Switch>
      </Router>
    
  {/* <List /> */}
      
    </div>
  );
}

export default App;
