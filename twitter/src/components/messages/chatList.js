import React, {useState} from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';
import logo from '../../svg/logo.svg';
import './chatList.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../../nav/globalNav.js';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

let dispTweet=null;

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
          {this.props.messagesList.map(messageList => {
            return(
                <Button href="/chat" className="Messages-Card-indi">
                <div key={messageList.messageId}>
                    <div className="Messages-Image">
                      <br/>
                      <img className="Messagesimage" src={messageList.image}/>
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

export default MessageCard;

{/*
<div className = "MessagesCard">
    {otherTweets.map((twt, index) =>
        <div className="Messages-Card-indi">
          <div className="Messages-Image">
            <br/>
            <img className="Messagesimage" src={twt.image}/>
          </div>
          <div className="Messages-Card-Body">
            <br/>
            <div className="Messages-Card-Body-Content">
              <h5 className="Messages-Card-Body-Name" dataFromParent = {this.state.name}>{twt.name}</h5>
              <p className="Messages-Card-Body-Handle">{twt.handle}</p>
              <p className="Messages-Card-Body-Date">{twt.date}</p>
            </div>
            <div>
              <p className="Messages-Card-Body-Text">{twt.tweet}</p>
            </div>
            <br/>
          </div>
        </div>
    )}
</div>*/}
