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
import {imageServer} from '../../config'

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
let file = null


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
  nameHandleChange=(e)=>{
    this.setState({name:e.target.value})//!=''?e.target.value:localStorage.getItem('name')})
  }
 emailHandleChange=(e)=>{
  this.setState({email:e.target.value})//!=''?e.target.value:localStorage.getItem('email')})
  }
  birthDateHandleChange=(e)=>{
    this.setState({birthDate:e.target.value})//!=''?e.target.value:localStorage.getItem('birthDate')})
  }
  userHandleHandlerChange=(e)=>{
    this.setState({userHandle:e.target.value})//!=''?e.target.value:localStorage.getItem('userHandle')})
  }
  bioHandleChange=(e)=>{
    this.setState({bio:e.target.value})//!=''?e.target.value:localStorage.getItem('bio')})
  }

  imageHandleChange=(e)=>{
    file =  e.target.files[0]
  }



    handleSubmit = event => {
      event.preventDefault();

      const formData = new FormData()

      let data = {
        _id:localStorage.getItem('id'),
        name: this.state.name==''?localStorage.getItem('name'):this.state.name,
        email: this.state.email==''?localStorage.getItem('email'):this.state.email,
        birthDate: this.state.birthDate==''?localStorage.getItem('birthDate'):this.state.birthDate,
        userHandle: this.state.userHandle==''?localStorage.getItem('userHandle'):this.state.userHandle,
        bio: this.state.bio==''?localStorage.getItem('bio'):this.state.bio,
        image: this.state.image==''?localStorage.getItem('image'):file

      };

      formData.append('name',this.state.name==''?localStorage.getItem('name'):this.state.name)
      formData.append('email',this.state.email==''?localStorage.getItem('email'):this.state.email)
      formData.append('birthDate',this.state.birthDate==''?localStorage.getItem('birthDate'):this.state.birthDate)
      formData.append('userHandle',this.state.userHandle==''?localStorage.getItem('userHandle'):this.state.userHandle)
      formData.append('bio',this.state.bio==''?localStorage.getItem('bio'):this.state.bio)
      formData.append('image',this.state.image==''?localStorage.getItem('image'):'')
      formData.append('_id',localStorage.getItem('id'))
      formData.append('profileImage',file)


      console.log('data',formData)
      //axios.post(`/profile/updateProfile/${this.state.id}`, user)
      axios.defaults.withCredentials=true
      let config={headers:{'Content-Type':'multipart/form-data'}}
      axios.post('/profile/updateProfile', formData,config)
        .then(response => {
          console.log('updateProfile response',response.data);
          localStorage.setItem('birthDate', response.data.birthDate);
          localStorage.setItem('bio', response.data.bio);
          localStorage.setItem('name', response.data.name);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('userHandle', response.data.userHandle);
          localStorage.setItem('image', response.data.image);
          window.location.reload()
        })
    }

    render(){
      return(
        <div>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>Name</Label>
                  <Input type="text" placeholder="Update Your Name" name="name" onChange={this.nameHandleChange.bind(this)}/>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" placeholder="Update Email" name="email" onChange={this.emailHandleChange.bind(this)}/>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label>Birth Date</Label>
              <Input type="text" placeholder="MM-DD-YYYY" name="birthDate" onChange={this.birthDateHandleChange.bind(this)}/>
            </FormGroup>
            <FormGroup>
              <Label>User Handle</Label>
              <Input type="text" placeholder="What you would like your Twitter handle to be?" name="userHandle" onChange={this.userHandleHandlerChange.bind(this)}/>
            </FormGroup>
            <FormGroup>
              <Label>Bio</Label>
              <Input type="text" placeholder="Enter bio" name="bio" onChange={this.bioHandleChange.bind(this)}/>
            </FormGroup>

            <FormGroup>
              <Label>Profile Image</Label>
              {/* <input id="file-input" type="file" onChange={onImageHandler}/> */}
              <Input type="file-input" type="file" onChange={this.imageHandleChange.bind(this)}/>
            </FormGroup>

            <Button type="submit" color="success">Submit</Button>
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
      localStorage.setItem('name', response.data[0].name);
      localStorage.setItem('email', response.data[0].email);
      localStorage.setItem('userHandle', response.data[0].userHandle);
      localStorage.setItem('image', response.data[0].image);
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
              <img className="ProfileOFImage" src={imageServer+'profileImages/'+twt.image}/>
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
            <img className = "image" src={imageServer+'profileImages/'+localStorage.getItem('image')} />
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
        {/*
        <div className = "ProfileBar">
          <div>
            <Button className = "BarTitle"><h4>{localStorage.getItem('name')}</h4></Button>
          </div>
          <div>
           <Button className = "BackButton"><img top width="500%" src={BackButton}/></Button>
          </div>
        </div>*/}
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
