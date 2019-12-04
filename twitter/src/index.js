import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/home/home.js';
import Login from './pages/login/login.js';

import SignUp from './pages/signup/signup.js';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Messages from './components/messages/messages.js';
import MessageBox from './components/messages/chatBox.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopTenLiked from './pages/dashboard/topTenLiked';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import UserProfile from './components/profile/profile.js';
import Analysis from './pages/dashboard/Analysis';
import LoadTweet from './pages/home/loadTweet';
import TweetLoadHome from './pages/home/tweetLoadHome';
import BookmarkPage from './components/bookmarks/bookmarkPage.js';
import ListPage from './components/lists/listPage.js';
import ViewListTweetsPage from './components/lists/viewListTweetsPage.js';
import OtherProfilePage from './components/profile/otherProfilePage.js';
import dashboardProfile from './components/profile/dashboardProfile';
import ShowUserListPage from './components/profile/showUserListPage.js';
import tweetSearchPage from './components/profile/tweetSearch';

//TODO: Add redux for isLoggedIn or not state

class Routes extends React.Component {

  render(){
  return(
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/profile' component={UserProfile} />
        <Route exact path='/bookmarks' component={BookmarkPage} />
        <Route exact path='/messages' component={Messages} />
        <Route exact path='/list' component={UserProfile} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/chat' component={MessageBox} />
        <Route exact path='/dashboard' component={Analysis} />
        <Route exact path='/loadTweet' component={TweetLoadHome} />
        <Route exact path='/bookmarkPage' component={BookmarkPage} />
       <Route exact path='/listPage' component={ListPage} />
       <Route exact path='/viewListTweetsPage' component={ViewListTweetsPage} />
       <Route exact path='/otherProfilePage' component={OtherProfilePage} />
       <Route exact path='/dashboardData' component={dashboardProfile} />
        <Route exact path='/showUserListPage' component={ShowUserListPage} />
        <Route exact path='/showtweetsearch' component={tweetSearchPage} />
      </Switch>
    </Router>
    )
  }
}

ReactDOM.render(
  <Routes />,
  document.getElementById('root'),
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
