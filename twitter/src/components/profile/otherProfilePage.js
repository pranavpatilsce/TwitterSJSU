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
import Birthday from '../../svg/birthday.jpeg';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import classnames from 'classnames';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Redirect} from 'react-router';

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
let userTweets=null, redirectToViewListFlag=false, redirectToViewList=null, redirectVar=null;

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
          <Button className = "BarTitle"> <h3>{localStorage.getItem('otherUserHandle')}</h3></Button>
        </div>
        <div>
         <Button className = "BackButton"><img top width="69%" src={BackButton}/></Button>
        </div>
      </div>
    )
  }

}
let bio=null, ownTweets=null, bdate=null
class ProfileCard extends React.Component {

constructor(props)
{

  super(props)
  this.state={
    profiledata:{}
  }

}

follow = (tobefollowdid)=>{

  let data={initiateId:localStorage.getItem("id"),tobeFollowedID:tobefollowdid}
  axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
  axios.post('/users/addFollowers', data)
    .then((response) => {
      console.log('Success follow operation, going to reload !!!',response.data)
      window.location.reload();
    })
    .catch(()=>{console.log('error')})


}

unfollow = (tobeunfollowdid)=>{
  let data={id:localStorage.getItem("id"),unfollowId:tobeunfollowdid}
  axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
  axios.post('/users/unfollow', data)
    .then((response) => {
      console.log('Success unfollow operation, going to reload !!!',response.data)
      window.location.reload();
    })
    .catch(()=>{console.log('error')})

}

componentWillMount=()=>{
  console.log('User handle loaded!!!!',localStorage.getItem('otherUserHandle'))
  let data = {userHandle:localStorage.getItem('otherUserHandle')};
  let token=localStorage.getItem('bearer-token');
  // alert('asd')
  axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
  axios.post('/profile/getProfileKafka', data)
    .then((response) => {
      console.log('response is getprofile !!!',response.data[0]['_id'])
      bio=response.data.bio
      localStorage.setItem('otherUserId',response.data[0]['_id'])
      ownTweets=response.data[0].tweets
      bdate=response.data.bdate
        console.log('response ok',response.data[0].tweets)
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
                <button className="Tweet-Body-Panel-Comment" ><img src={comment}/></button>
                <button className="Tweet-Body-Panel-ReTweet" ><img src={retweet}/></button>
                <button className="Tweet-Body-Panel-Like" ><img src={like}/></button>
                <button className="Tweet-Body-Panel-Bookmark" ><img src={bookmark}/></button>
                <br/>
                <br/>
                <br/>
              </div>
            </div>
          </div>
          )
        }
            )
            console.log('usertweeetssssssssssssssssssssssssssssssssss------------------>',userTweets)
            this.setState({profiledata:response.data})
            this.setState({})
    })
    .catch(()=>{console.log('error')})
}
showList=()=>{
  redirectToViewListFlag=true;
  this.setState({})
}
  render(){
    console.log('This profiledata state is!!!!!!!!!!!!!!!!!!!!!!!!!!!',this.state.profiledata)
    if(this.state.profiledata[0]!=undefined)
    {
      if(this.state.profiledata[0].followers.includes(localStorage.getItem('id')))
      {
        document.getElementById("follo").disabled = true;
      }
      else{
        document.getElementById("unfollo").disabled = true;
      }
    }
    if(redirectToViewListFlag)
    {
      redirectToViewList=<Redirect to="/showUserListPage"/>
      redirectToViewListFlag=false;
    }
    return(
      <div className="ProfileCard-Parent">
        {redirectToViewList}
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
    <h4 className = "ProfileName">{this.state.profiledata[0]==undefined?"":this.state.profiledata[0].name}</h4>
                <p className = "ProfileHandle">{this.state.profiledata[0]==undefined?"":this.state.profiledata[0].userHandle}</p>
              </div>
              <div className = "ProfileBio">
                <p>{this.state.profiledata.bio}</p>
              </div>
              <div className = "UserInfo">
                <div className = "UserInfo-Location">
                  <p><img top width="17%" src={Location}/>{this.state.profiledata[0]==undefined?"":this.state.profiledata[0].location}</p>
                </div>
                <div className = "UserInfo-Birthday">
                  <p><img top width="14%" src={Birthday}/>Born on {this.state.profiledata[0]==undefined?"":this.state.profiledata[0].birthDate}</p>
                </div>
              </div>
              <div>

                <a className = "profileFollowers" href='#'>{this.state.profiledata[0]==undefined?0:this.state.profiledata[0].following.length} Following</a>{'  '}
                <a className = "profileFollowers" href='#'>{this.state.profiledata[0]==undefined?0:this.state.profiledata[0].followers.length} Followers</a>
                <span> </span> <button className="btn btn-primary" id="follo" onClick={()=>{this.follow(this.state.profiledata[0]._id)}} >Follow</button><span> </span>
                <button className="btn btn-primary" id="unfollo" onClick={()=>{this.unfollow(this.state.profiledata[0]._id)}}>UnFollow</button><span> </span>
                <Button color="primary" className="btn btn-primary" href="/showUserListPage">View List</Button><span> </span>
                <CreateChatModal/>
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
const CreateChatModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
const sendMessage=()=>{
  let data={
    "senderId" : localStorage.getItem('id'),
    "receiverId" : localStorage.getItem('otherUserId'),
    "message": document.getElementById('sendChatMessage').value,
    "senderHandle" :localStorage.getItem('userHandle'),
    "receiverHandle" :localStorage.getItem('otherUserHandle')
  }
  axios.defaults.withCredentials=true
  axios.post('/messages/createChat',data)
  .then((response)=>{
    console.log('create cht resp',response.data)
    if(localStorage.getItem('chats')==null ||localStorage.getItem('chats')=='')
      localStorage.setItem('chats',response.data._id)
    else
      localStorage.setItem('chats',localStorage.getItem('chats')+","+response.data._id)
    window.location.reload()
  })
  .catch((err)=>{
    console.log('err create chat',err)
  })
}
  return (
    <span>
      <Button color="primary" onClick={toggle}>Message</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        {/* <ModalHeader toggle={toggle}>Message</ModalHeader> */}
        <ModalBody>
        <Form>
      <FormGroup row>
        <Label for="exampleEmail" sm={2}>Message</Label>
        <Col sm={10}>
          <Input type="email" name="email" id="sendChatMessage" placeholder="send a message"  />
        </Col>
      </FormGroup>
      </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={sendMessage}>Send</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </span>
  );
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

class otherProfilePage extends React.Component {

  render(){
    if(!localStorage.getItem('email')){
      redirectVar = <Redirect to= "/"/>
  }
    return(
      <div className="Profile">
        {redirectVar}
        <div className="Profile-Navigation">
          <Navigation />
        </div>

          {/*<ProfileTopBar/>*/}

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

export default otherProfilePage;
