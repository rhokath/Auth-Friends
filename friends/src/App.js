import React from 'react';
import Login from './components/login';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import FriendForm from './components/friendslist';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
      hello world
      </header>
      <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/protected" component={FriendForm} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
