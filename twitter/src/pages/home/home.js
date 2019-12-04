import React from 'react';
import {Button} from 'reactstrap';
import logo from '../../svg/logo.svg';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../../nav/globalNav.js';
import RightSide from '../../components/search/search.js';
import {Redirect} from 'react-router';
import Tweet from './tweet.js';
import './tweet.css';

class ProfileTopBar extends React.Component {

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

function Home() {
  let redirectVar = null;
  if(!localStorage.getItem('userHandle')){
      redirectVar = <Redirect to= "/"/>
  }
  return (
    <div>
      {redirectVar}
    <div className="Home">

      <div className="Home-Navigation">
        <Navigation />
      </div>

      <ProfileTopBar />

      <div className="Home-Home">
        <div className="Home-Home-Card" jumbotron-fluid>
            <Tweet />
        </div>
      </div>

      <div className="Home-RightSide">
        <RightSide />
      </div>
    </div>
    </div>
  );
}

export default Home;
