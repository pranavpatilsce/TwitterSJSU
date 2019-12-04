import React from 'react';
import {Button} from 'reactstrap';
import logo from '../../svg/logo.svg';
import '../../pages/home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../../nav/globalNav.js';
import RightSide from '../search/search.js';
import Bookmark from './bookmarks.js';
import '../../pages/home/tweet.css';
import {Redirect} from 'react-router';

class ProfileTopBar extends React.Component {

  render(){
    return(
      <div className = "ProfileBar">
        <div>
          <Button className = "BarTitle"> <h3>Bookmarks</h3></Button>
        </div>
      </div>
    )
  }
}

function BookmarkPage() {

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
            <Bookmark />
        </div>
      </div>

      <div className="Home-RightSide">
        <RightSide />
      </div>
    </div>
    </div>
  );
}

export default BookmarkPage;
