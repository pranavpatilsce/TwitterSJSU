import React from 'react';
import {Button} from 'reactstrap';
import logo from '../../svg/logo.svg';
import '../../pages/home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../../nav/globalNav.js';
import RightSide from '../search/search.js';
import Lists from './lists';
import '../../pages/home/tweet.css';

import './lists.css';

{/*
class ProfileTopBar extends React.Component {

  render(){
    return(
      <div className = "ProfileBar">
        <div>
          <Button className = "BarTitle"> <h3>Lists</h3></Button>
        </div>
      </div>
    )
  }
}
*/}

function ListPage() {
  return (
    <div className="Home">

      <div className="Home-Navigation">
        <Navigation />
      </div>

      <div className = "ProfileBar">
        <div>
          <Button className = "BarTitle"><h3>Lists</h3></Button>
        </div>
      </div>
      {/*<ProfileTopBar />*/}

      <div className="Messages-Messages">
        <div className="Messages-Messages-Card" jumbotron-fluid>
            <Lists />
        </div>
      </div>

      <div className="Home-RightSide">
        <RightSide />
      </div>
    </div>
  );
}

export default ListPage;
