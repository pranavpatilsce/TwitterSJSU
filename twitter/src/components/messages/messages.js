import React, {useState} from 'react';
import {Button} from 'reactstrap';
import logo from '../../svg/logo.svg';
import './messages.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../../nav/globalNav.js';
import RightSide from '../../components/search/search.js';
import MessageBox from './chatBox.js';
import MessageCard from './chatList.js';
import './chatList.css';

import Pranav from '../../svg/Pranav.jpeg';
import Kalyani from '../../svg/Kalyani.jpeg';
import Mukesh from '../../svg/Mukesh.jpeg';
import Kartik from '../../svg/Kartik.png';

const otherTweets = [
  {
    messageId: "12345",
    text: "CMPE273 tweet",
    time: "02:16:57",
    date: "Jul 23 2005",
    name: "Mukesh Mogal",
    userHandle: "@handle",
    image: Mukesh
  },{
    messageId: "123456",
    text: "CMPE273 tweet",
    time: "02:16:57",
    date: "Jul 23 2005",
    name: "Kalyani Deshmukh",
    userHandle: "@handle2",
    image: Kalyani
  },{
    messageId: "123457",
    text: "CMPE273 tweet",
    time: "02:16:57",
    date: "Jul 23 2005",
    name: "Kartik Ulmarkar",
    userHandle: "@handle3",
    image: Kartik
  }
];

class Messages extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: otherTweets,
    };
  }

  render(){
  return (
    <div className="Messages">

      <div className="Messages-Navigation">
        <Navigation />
      </div>
      <div className="MessagesBar">
        <div>
          <Button className = "MessagesBarTitle"><h3>Messages</h3></Button>
        </div>
      </div>
      <div className="Messages-Messages">
        <div className="Messages-Messages-Card">
          <MessageCard messages={this.state.messages}/>
        </div>
      </div>

      <div className="Messages-RightSide">
          <MessageBox dataFromParentForChat={this.state.message}/>
      </div>
    </div>
  )
  }
}

export default Messages;
