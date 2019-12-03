import React, {useState} from 'react';
import {Button} from 'reactstrap';
import logo from '../../svg/logo.svg';
import axios from 'axios';
import './messages.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../../nav/globalNav.js';
import RightSide from '../../components/search/search.js';
//import MessageBox from './chatBox.js';
//import MessageCard from './chatList.js';
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

let globalSomething = [];

class MessageCard extends React.Component{

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     messageId: this.props.dataFromParent,
  //     name: this.props.dataFromParent,
  //     userHandle: this.props.dataFromParent,
  //     date: this.props.dataFromParent,
  //   };
  // }

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     messageId: this.props.dataFromParent,
  //     name: this.props.dataFromParent,
  //     userHandle: this.props.dataFromParent,
  //     date: this.props.dataFromParent,
  //   };
  // }

  render() {

      //
      // let data = '5de03cd0b5ad6906843d79d2';
      // let token=localStorage.getItem('bearer-token');
      // axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      // axios.get('/profile/getAllTweets/5de03cd0b5ad6906843d79d2', {params:{}, mode:'no-cors'})
      //   .then((response) => {
      //       console.log('response ok',response)
      //   })
      //   .catch(()=>{console.log('error')})
      return(
        <div className = "MessagesCard">
          {globalSomething.map(messageList => {
            return(
                <Button href="/chat" className="Messages-Card-indi">
                <div key={messageList._id}>
                    <div className="Messages-Image">
                      <br/>
                    </div>
                    <div className="Messages-Card-Body">
                      <br/>
                      <div className="Messages-Card-Body-Content">
                        <h5 className="Messages-Card-Body-Name">{messageList.name}</h5>
                        <p className="Messages-Card-Body-Handle">{messageList.userHandle}</p>
                        <p className="Messages-Card-Body-Date">{messageList.date}</p>
                      </div>
                      <br/>
                    </div>
                </div>
                </Button>
              )
          })}
        </div>
      )
    }
}

class Messages extends React.Component {

  // constructor(props) {
  //   super(props)
  //     this.state = {
  //
  //     };
  // }



  componentWillMount(){
    let data = {
      //chats: localStorage.getItem('chats')
      chats: "5de48e956528003d3887b7b3,5de491e4aff08e0c8cdab48e"
    }
    axios.post('/messages/getAllChats', data)
      .then((response) => {
          console.log('response ok',response)
          console.log("All Chats:", response.data);
          if(response.data=="error")
          {
              alert("Invalid credentials");
          }
          localStorage.setItem('messagesList', response.data)
          //
          //console.log("messagesList", this.state.messagesList);
      })
      .then(response => {
          console.log('state set');
          // this.setState({
          //   messagesList: response.data
          // });
          globalSomething = response.data;
      })
      .catch(response => {
          alert("Invalid");
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
          <MessageCard/>
        </div>
      </div>
      {/*
        <div className="Messages-RightSide">
          {/*<div className="Messages-RightSide-PreLoad">

          </div>
          <MessageBox messagesList={this.state.messagesList}/>
          {/*<MessageBox messages={this.state.messages}/>
      </div>
      */}
    </div>
  )
  }
}

export default Messages;
