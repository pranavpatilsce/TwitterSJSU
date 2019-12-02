import React, {useState} from 'react';
import {Button} from 'reactstrap';
import logo from '../../svg/logo.svg';
import axios from 'axios';
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
    chatId: "12345",
    text: "CMPE273 tweet",
    time: "02:16:57",
    date: "Jul 23 2005",
    name: "Mukesh Mogal",
    userHandle: "@handle",
    image: Mukesh
  },{
    chatId: "123456",
    text: "CMPE273 tweet",
    time: "02:16:57",
    date: "Jul 23 2005",
    name: "Kalyani Deshmukh",
    userHandle: "@handle2",
    image: Kalyani
  },{
    chatId: "123457",
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
      messagesList: otherTweets,
    };
  }

  componentDidMount(){

    let data = {
      //chats: localStorage.getItem('chats')
      chats: "5de48e956528003d3887b7b3,5de491e4aff08e0c8cdab48e"
    }
    axios.post('http://10.0.0.94:3001/messages/getAllChats', data)
      .then((response) => {
          console.log('response ok',response)
          console.log("All Chats:", response.data);
          if(response.data=="error")
          {
              alert("Invalid credentials");
          }
          this.setState({messagesList: response.data});
      })
      .catch (response => {
          alert("Invalid");
          this.setState({});
        }
      )

  }

  render(){
  return (
    <div className="Messages">

      <div className="Messages-Navigation">
        <Navigation />
      </div>
      <div className="MessagesBar">
        <div>
          <Button className="MessagesBarTitle"><h3>Messages</h3></Button>
        </div>
      </div>
      <div type="button" className="Messages-Messages">
        <div type="button" className="Messages-Messages-Card">
          <MessageCard messagesList={this.state.messagesList}/>
        </div>
      </div>
      <div className="Messages-RightSide">
          {/*<div className="Messages-RightSide-PreLoad">

          </div>*/}
          <MessageBox messagesList={this.state.messagesList}/>
          {/*<MessageBox messages={this.state.messages}/>*/}
      </div>
    </div>
  )
  }
}

export default Messages;
