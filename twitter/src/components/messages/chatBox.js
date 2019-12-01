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

class MessageBox extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      messageId: this.props.dataFromParentForChat,
      name: this.props.dataFromParentForChat,
      userHandle: this.props.dataFromParentForChat,
      date: this.props.dataFromParentForChat,
    };
  }

  render(){
    return(
      <div className="chat-div">
        <div>Data from card is:</div>
      </div>
    )
  }
}

export default MessageBox;
