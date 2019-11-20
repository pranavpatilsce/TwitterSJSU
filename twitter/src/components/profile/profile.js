import React, {useState} from 'react';
import {Button} from 'reactstrap';
import './profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../../nav/globalNav.js';
import RightSide from '../search/search.js';
import Pranav from '../../svg/Pranav.jpeg';
import Wallpaper from '../../svg/wallpaper.jpeg';

import Tweet from '../../pages/home/userTweet.js';
import BackButton from '../../svg/backProfile.png';

import Location from '../../svg/location.png';
import Calendar from '../../svg/calendar.png';
import Birthday from '../../svg/birthday.jpeg';

import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

class NoMedia extends React.Component {
  render(){
    return(
      <div>
        <h5 className="MainAccouncement-Media">You haven't Tweeted any photos or videos yet</h5>
        <h6 className="SubAccouncement-Media">When you send with photos or videos in them, they will show up here.</h6>
        <Button className="buttonNoTweet"> Tweet a photo or video</Button>
      </div>
    )
  }
}

class NoLikes extends React.Component {
  render(){
    return(
      <div>
        <h5 className="MainAccouncement-Likes">You don't have any likes yet</h5>
        <h6 className="SubAccouncement-Likes">Tap the heart on any Tweet to show it some love. When you do, it'll show up here.</h6>
      </div>
    )
  }
}

const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <Nav tabs className="ProfileTabsDiv">
        <NavItem  className="ProfileTabs">
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Tweets
          </NavLink>
        </NavItem>
        <NavItem  className="ProfileTabs">
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Tweets & replies
          </NavLink>
        </NavItem>
        <NavItem  className="ProfileTabs">
          <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
            >
            Media
          </NavLink>
        </NavItem>
        <NavItem  className="ProfileTabs">
          <NavLink
            className={classnames({ active: activeTab === '4' }) }
            onClick={() => { toggle('4'); }}
          >
            Likes
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <div className="Profile-Profile-Card">
              <Tweet/>
          </div>
        </TabPane>
        <TabPane tabId="2">
          <div className="Profile-Profile-Card">
              <Tweet/>
          </div>
        </TabPane>
        <TabPane tabId="3">
          <NoMedia />
        </TabPane>
        <TabPane tabId="4">
          <NoLikes />
        </TabPane>
      </TabContent>
    </div>
  );
}

class ProfileTopBar extends React.Component {

  render(){
    return(
      <div className = "ProfileBar">
        <div>
          <Button className = "BarTitle"> <h3>Pranav Patil</h3></Button>
        </div>
        <div>
         <Button className = "BackButton"><img top width="69%" src={BackButton}/></Button>
        </div>
      </div>
    )
  }

}

class ProfileCard extends React.Component {


  render(){
    return(
      <div className="ProfileCard-Parent">
          <div className="ProfileCard-Wallpaper">
            <img src={Wallpaper}/>
          </div>
          <div className="ProfileCard-Image">
            <img className = "image" src={Pranav} />
          </div>
          <div>
            <Button className="EditButton EditButton2">Edit Profile</Button>
          </div>
          <div className = "overall">
              <div>
                <h4 className = "ProfileName">Pranav Patil</h4>
                <p className = "ProfileHandle">@pranavpatilsf</p>
              </div>
              <div className = "ProfileBio">
                <p>CMPE 273 is not fun</p>
              </div>
              <div className = "UserInfo">
                <div className = "UserInfo-Location">
                  <p><img top width="17%" src={Location}/>SF Bay Area, CA</p>
                </div>
                <div className = "UserInfo-Birthday">
                  <p><img top width="14%" src={Birthday}/>Born on 5 January 2000</p>
                </div>
                <div className = "UserInfo-Calendar">
                  <p><img top width="16%" src={Calendar}/>Joined May 2013</p>
                </div>
              </div>

              <div>
                <a className = "profileFollowers" href='#'>566 Following</a>{'  '}
                <a className = "profileFollowers" href='#'>63 Followers</a>
              </div>
          </div>
          <div>
            <Tabs/>
          </div>
      </div>
    )
  }

}

class ProfileTabs extends React.Component {

  render(){
    return(
      <div>
        <p> yo </p>
      </div>
    )
  }

}

class UserProfileHome extends React.Component {

  render(){
    return(

      <div className="Profile">
        <div className="Profile-Navigation">
          <Navigation />
        </div>

          <ProfileTopBar/>
        
        <div>
          <ProfileCard/>
        </div>
        <div className="Profile-RightSide">
          <RightSide />
        </div>
      </div>
    )
  }

}

export default UserProfileHome;
