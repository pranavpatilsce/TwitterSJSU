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
    message: "CMPE273 tweet",
    time: "02:16:57",
    date: "Jul 23 2005",
    name: "Mukesh Mogal",
    userHandle: "@handle",
    image: Mukesh
  },{
    chatId: "123456",
    message: "CMPE273 tweet",
    time: "02:16:57",
    date: "Jul 23 2005",
    name: "Kalyani Deshmukh",
    userHandle: "@handle2",
    image: Kalyani
  },{
    chatId: "123457",
    message: "CMPE273 tweet",
    time: "02:16:57",
    date: "Jul 23 2005",
    name: "Kartik Ulmarkar",
    userHandle: "@handle3",
    image: Kartik
  }
];

const globalSomething = [];

class MessageCard extends React.Component{

  render() {

      return(
        <div className = "MessagesCard">
          {/* {globalSomething.map(message => {
            return(*/}
                <div className="Messages-Card-indi"> {/*href="/chat"*/}
                <div>
                    <div className="Messages-Image">
                      <br/>
                      {/*<img className="Messagesimage" src={_id.image}/>*/}
                    </div>
                    <div className="Messages-Card-Body">
                      <br/>
                      <div className="Messages-Card-Body-Content">
                        <Button color="success"><p>Read Msgs</p></Button>
                        <h5 className="Messages-Card-Body-Name"></h5>
                        <p className="Messages-Card-Body-Handle">{/*{_id.userHandle}*/}</p>
                        <p className="Messages-Card-Body-Date">{/*{messageList.date}*/}</p>
                        <Button color="danger"><p>Message</p></Button>
                      </div>
                      <br/>
                    </div>
                </div>
                </div>
            {/*  )
           })} */}
        </div>
      )
    }
}

class Messages extends React.Component {

  constructor(props) {
    super(props)
      this.state = {
        messagesList: globalSomething
      };

  }

  componentWillMount(){
    let data = {
      //chats: localStorage.getItem('chats')
      chats: "5de48e956528003d3887b7b3,5de491e4aff08e0c8cdab48e"
    }
    axios.post('/messages/getAllChats', data)
      .then((response) => {
          console.log('response ok',response)
          console.log("All Chats:", response.data);
          localStorage.setItem('messagesList', response.data)
          //
          //console.log("messagesList", this.state.messagesList);
          console.log('state set');
          globalSomething = response.data;
          this.setState({});
      })
      .then(response => {
          this.setState({
             messagesList: [response.data]
          });

      })
      .catch(response => {
          alert("Invalid");
      })
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
          <MessageCard/> {/*messagesList={this.state.messagesList}*/}
        </div>
      </div>
      <div className="Messages-RightSide">
          <div className="Messages-RightSide-PreLoad">
            {/*<MessageBox messagesList={this.state.messagesList}/>*/}
          </div>
      </div>

    </div>
  )
  }
}

export default Messages;
