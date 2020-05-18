import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Message from './Message';
import PrivateChat from './PrivateMessage'

const App = () => {

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Message} />
          <Route path="/:studentId/:tutorId" exact component={PrivateChat} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
