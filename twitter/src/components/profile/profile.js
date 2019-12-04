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
import like from '../../svg/like.jpeg';
import retweet from '../../svg/retweet.jpeg';
import comment from '../../svg/comment.jpeg';
//import option from '../../svg/option.jpeg';
import bookmark from '../../svg/bookmark.jpeg';
import Location from '../../svg/location.png';
import Calendar from '../../svg/calendar.png';
import birthdate from '../../svg/birthday.jpeg';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import {Redirect} from 'react-router';

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Form, FormGroup, Label, Input } from 'reactstrap';


let userTweets=null;

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
      {alert('tabs')}
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
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            Likes
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <div className="Profile-Profile-Card">
              {userTweets}
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
          <Button className = "BarTitle"> <h3>{localStorage.getItem('name')}</h3></Button>
        </div>
        <div>
         <Button className = "BackButton"><img top width="69%" src={BackButton}/></Button>
        </div>
      </div>
    )
  }

}

//let bio=null, ownTweets=null, birthDate=null
let bioGlobal=null, ownTweets=null, bdate=null, location=null,followers=0,following=0



class ProfileEditForm extends React.Component{

  constructor(props){
   super(props)
    this.state = {
      id: '',
      name: '',
      email: '',
      birthDate: '',
      userHandle: '',
      bio: ''
    }
  }

   handleChange = event => {

     this.setState({ name: event.target.value });
     this.setState({ email: event.target.valuel });
     this.setState({ birthDate: event.target.value });
     this.setState({ userHandle: event.target.value });
     this.setState({ bio: event.target.value });
      // console.log(event.target.email);
      // console.log(event.target.birthDate);
      // console.log(event.target.userHandle);
      // console.log(event.target.bio);

      // if(event.target.name == ''){
      //   this.setState({ name: localStorage.getItem('name') });
      //   console.log(event.target.name);
      // }else{
      //   localStorage.setItem('name', event.target.value);
      //   this.setState({ name: event.target.value });
      // }
      //
      // if(event.target.email == ''){
      //   this.setState({ email: localStorage.getItem('email') });
      //   console.log(event.target.email);
      // }else{
      //   localStorage.setItem('email', event.target.value);
      //   this.setState({ email: event.target.value });
      // }
      //
      // if(event.target.birthDate == ''){
      //   this.setState({ birthDate: localStorage.getItem('birthDate') });
      //   console.log(event.target.birthDate);
      // }else{
      //   localStorage.setItem('birthDate', event.target.value);
      //   this.setState({ birthDate: event.target.value });
      // }
      //
      // if(event.target.userHandle == ''){
      //   this.setState({ userHandle: localStorage.getItem('userHandle') });
      //   console.log(event.target.userHandle);
      // }else{
      //   localStorage.setItem('userHandle', event.target.userHandle);
      //   this.setState({ userHandle: event.target.value });
      // }
      //
      // if(event.target.bio == ''){
      //   this.setState({ bio: localStorage.getItem('bio') });
      //   console.log(event.target.bio);
      // }else{
      //   localStorage.setItem('bio', event.target.bio);
      //   this.setState({ bio: event.target.value });
      // }

      this.setState({ id: localStorage.getItem('id') });
      console.log('id', this.state.id);
      // if(event.target.email == undefined || event.target.name == ''){
      //   this.setState({ email: localStorage.getItem('email') });
      // }else{
      //   localStorage.setItem('email', event.target.email);
      //   this.setState({ email: event.target.value });
      // }
      //
      // if(event.target.birthDate == undefined || event.target.name == ''){
      //   this.setState({ birthDate: localStorage.getItem('birthDate') });
      // }else{
      //   localStorage.setItem('birthDate', event.target.birthDate);
      //   this.setState({ birthDate: event.target.value });
      // }
      //
      // if(event.target.userHandle == undefined || event.target.name == ''){
      //   this.setState({ userHandle: localStorage.getItem('userHandle') });
      // }else{
      //   localStorage.setItem('userHandle', event.target.userHandle);
      //   this.setState({ userHandle: event.target.value });
      // }
      //
      // if(event.target.bio == undefined || event.target.name == ''){
      //   this.setState({ bio: localStorage.getItem('bio') });
      // }else{
      //   localStorage.setItem('bio', event.target.bio);
      //   this.setState({ bio: event.target.value });
      // }

    }

    handleSubmit = event => {
      event.preventDefault();

      const user = {
        name: this.state.name,
        email: this.state.email,
        birthDate: this.state.birthDate,
        userHandle: this.state.userHandle,
        bio: this.state.bio
      };

      //axios.post(`/profile/updateProfile/${this.state.id}`, user)

      axios.post(`/profile/updateProfile/${this.state.id}`, user)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    }

    render(){

      return(
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>Name</Label>
                  <Input type="text" placeholder="Enter Twitter Account Name" name="name" onChange={this.handleChange}/>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" placeholder="password placeholder" name="email" onChange={this.handleChange}/>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label>Birth Date</Label>
              <Input type="text" placeholder="MM-DD-YYYY" name="birthDate" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label>User Handle</Label>
              <Input type="text" placeholder="Enter what you would like your Twitter handle to be. Example: @earth" name="userHandle" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label>Bio</Label>
              <Input type="text" placeholder="Enter bio" name="bio" onChange={this.handleChange}/>
            </FormGroup>
            <Button type="submit" color="success" href="/profile">Submit</Button>
          </Form>
      </div>
    )
  }
}

const EditProfileModal = (props) => {


  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button className="EditButton EditButton2" onClick={toggle}>Edit Profile</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Profile</ModalHeader>
        <ModalBody>
          <div>
            <ProfileEditForm/>
          </div>
        </ModalBody>
        <ModalFooter>
          {/*<Button color="primary" onClick={toggle}>Do Something</Button>{' '}*/}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}


class ProfileCard extends React.Component {

constructor(props)
{
  super(props)
  let data = {userHandle:localStorage.getItem('userHandle')};
  let token=localStorage.getItem('bearer-token');
  // alert('asd')
  axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
  axios.post('/profile/getProfileKafka', data)
    .then((response) => {
      bioGlobal=response.data[0].bio
      ownTweets=response.data[0].tweets

      bdate=response.data[0].birthDate
      //birthDate=response.data[0].birthDate
      localStorage.setItem('birthDate', response.data[0].birthDate);
      localStorage.setItem('bio', bioGlobal);
        console.log('response ok',response.data[0].tweets)


      location = response.data[0].location
      localStorage.setItem('location', location);
      followers=response.data[0].followers.length
      following=response.data[0].following.length
        console.log('response ok',response.data[0])

        userTweets=ownTweets.map((twt, index) =>{
          return(
            <div className="tweetCard-indi">
            <div className="Tweet-Image">
              <br/>
              <img className="image" src={twt.image}/>
            </div>
            <div className="Tweet-Body">
              <br/>
              <div className="Tweet-Body-Content">
                <h5 className="Tweet-Body-Name">{twt.name}</h5>
                <p className="Tweet-Body-Handle">{twt.userHandle}</p>
                <p className="Tweet-Body-Date">{twt.date}</p>
              </div>
              <div>
                <p className="Tweet-Body-Text">{twt.tweet}</p>
              </div>
              <div className="Tweet-Body-Panel">
                <button className="Tweet-Body-Panel-Comment" ><span style={{color:"white"}}>{twt.replies.length}</span><img src={comment}/></button>
                <button className="Tweet-Body-Panel-ReTweet" ><img src={retweet}/></button>
                <button className="Tweet-Body-Panel-Like" ><span style={{color:"white"}}>{twt.likes}</span><img src={like}/></button>
                {/* <button className="Tweet-Body-Panel-Bookmark" ><img src={bookmark}/></button> */}
                <br/>
                <br/>
                <br/>
              </div>
            </div>
          </div>
          )
        }
            )
            console.log('usertw',userTweets)
            this.setState({})
    })
    .catch(()=>{console.log('error')})
    }

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
              <EditProfileModal>Edit Profile</EditProfileModal>
          </div>
          <div className = "overall">
              <div>
                <h4 className = "ProfileName">{localStorage.getItem('name')}</h4>
                <p className = "ProfileHandle">{localStorage.getItem('userHandle')}</p>
              </div>
              <div className = "ProfileBio">
                <p>{bioGlobal}</p>
              </div>
              <div className = "UserInfo">
                <div className = "UserInfo-Location">
                <p><img top width="17%" src={Location}/>{location}</p>
                </div>
                <div className = "UserInfo-Birthday">
                  <p><img top width="17%" src={birthdate}/>Born on {bdate}</p>
                </div>
              </div>
              <div>
    <a className = "profileFollowers" href='#'>{following} Following</a>{'  '}
    <a className = "profileFollowers" href='#'>{followers} Followers</a>
              </div>
          </div>
          <div>
            {/* <Tabs/> */}
            {userTweets}
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
    let redirectVar = null;
    if(!localStorage.getItem('userHandle')){
        redirectVar = <Redirect to= "/"/>
    }
    return(
      <div>
        {redirectVar}
      <div className="Profile">
        <div className="Profile-Navigation">
          <Navigation />
        </div>
        <div className = "ProfileBar">
          <div>
            <Button className = "BarTitle"><h4>{localStorage.getItem('name')}</h4></Button>
          </div>
          <div>
           <Button className = "BackButton"><img top width="500%" src={BackButton}/></Button>
          </div>
        </div>
        <div>
          <ProfileCard/>
        </div>
        <div className="Profile-RightSide">
          <RightSide />
        </div>
      </div>
      </div>
    )
  }

}

export default UserProfileHome;
