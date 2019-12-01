import React, {useState} from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';
import logo from '../../svg/logo.svg';
import './chatBox.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Pranav from '../../svg/Pranav.jpeg';
import Kalyani from '../../svg/Kalyani.jpeg';
import Mukesh from '../../svg/Mukesh.jpeg';
import Kartik from '../../svg/Kartik.png';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';


class SendMessageForm extends React.Component {
      constructor() {
        super()
        this.state = {
          message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }

      handleChange(e) {
        this.setState({
          message: e.target.value
        })
      }

      handleSubmit(e) {
        e.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
          message: ''
        })
      }

      render() {
        return (
          <form
            onSubmit={this.handleSubmit}
            className="send-message-form">
            <input
              onChange={this.handleChange}
              value={this.state.message}
              placeholder="Type your message and hit ENTER"
              type="text" />
          </form>
        )
    }
}

class MessageBox extends React.Component{

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     messageId: this.props.dataFromParentForChat,
  //     name: this.props.dataFromParentForChat,
  //     userHandle: this.props.dataFromParentForChat,
  //     date: this.props.dataFromParentForChat,
  //   };
  // }

  render(){
    return(
      <div className="chat-div">
        {this.props.messagesList.map(message => {
          return(
            <div className="chatMessagesReceive">
              <p>{message.text}</p>
            </div>
          )
        })}
        <SendMessageForm />
      </div>
    )
  }
}

export default MessageBox;
