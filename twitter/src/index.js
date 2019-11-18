import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/home/home.js';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import UserProfile from './components/profile/profile.js';
//TODO: Add redux for isLoggedIn or not state

class Routes extends React.Component {

  render(){
  return(
    <Router>
      <Switch>

        <Route exact path='/' component={Home} />
        <Route exact path='/profile' component={UserProfile} />
      </Switch>
    </Router>
    )
  }

}

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
