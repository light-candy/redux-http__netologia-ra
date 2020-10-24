import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import { ServiceList } from './components/serviceList';
import { ServiceEdit } from './components/serviceEdit';
import './App.css';

function App() {
  return (
      <Router>
        <Switch>
         <Redirect exact from="/" to="/services" />
         <Route exact path="/services" component={ServiceList} />
         <Route path="/services/:id" component={ServiceEdit} />
        </Switch>
      </Router>
  );
}

export default App;
