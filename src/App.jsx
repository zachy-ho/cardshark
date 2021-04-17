import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';
import Home from './components/pages/Home';
import DeckView from './components/pages/DeckView';
import Answer from './components/pages/Answer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/deck" component={DeckView} />
          <PrivateRoute path="/topic/:topic_id/card/:id/answers" component={Answer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
