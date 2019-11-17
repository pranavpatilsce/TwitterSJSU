import React from 'react';
import {Button} from 'reactstrap';
import logo from '../../svg/logo.svg';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../../nav/globalNav.js';
import RightSide from '../../components/search/search.js';
import Tweet from './tweet.js';

function Home() {
  return (
    <div className="Home">

      <div className="Home-Navigation">
        <Navigation />
      </div>

      <div className="Home-Home">
        <div className="Home-Home-Card" jumbotron-fluid>
            <Tweet />
        </div>
        {/* <img src={logo} alt="logo" /> */}
      </div>

      <div className="Home-RightSide">
        <RightSide />
      </div>
    </div>
  );
}

export default Home;
