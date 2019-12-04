import React from 'react';
import {Button} from 'reactstrap';
import logo from '../../svg/logo.svg';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../../nav/globalNav.js';
import RightSide from '../../components/search/search.js';
import Tweet from './tweet.js';
import './tweet.css';
import LoadTweet from './loadTweet';

class ProfileTopBar  extends React.Component {

  render(){
    return(
      <div className = "ProfileBar">
        <div>
          <Button className = "BarTitle"> <h3>Home</h3></Button>
        </div>
      </div>
    )
  }
}

function TweetLoadHome() {
  return (
    <div className="Home">
      <div className="Home-Navigation">
        <Navigation />
      </div>

      <ProfileTopBar />

      <div className="Home-Home">
        <div className="Home-Home-Card" jumbotron-fluid>
            <LoadTweet />
        </div>
      </div>

      <div className="Home-RightSide">
        <RightSide />
      </div>
    </div>
  );
}

export default TweetLoadHome;
