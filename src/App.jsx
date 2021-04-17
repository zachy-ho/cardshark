import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';
import Home from './components/pages/Home';
import DeckView from './components/pages/DeckView';
import './App.css';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Home />
      <Router>
        <Switch>
          <PrivateRoute path="/" component={Home} />
          <PrivateRoute path="/deck" component={DeckView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
