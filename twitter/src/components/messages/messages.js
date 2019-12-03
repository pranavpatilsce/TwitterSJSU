import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
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


const SendMessageModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  console.log(props);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
const sendMessage=()=>{

  console.log("inside handle submit");
  //this.props.sendMessage(this.state.message)
  let data2 =
  {
    "chatId" : props.chat_id,
    "senderId" : localStorage.getItem('id'),
    "receiverId" : props.receiver_id,
    "message" : document.getElementById('sendChatMessage').value
  }
  axios.post('/messages/addMessageToChat', data2)
    .then((response) => {
        console.log('response ok',response)
        console.log("Status Code : ", response);

        if(response.data!="error")
        {
            alert("Message sent");
        }

        if(response.data=="error")
        {
            alert("Invalid credentials");
        }

    })
    .catch (response => {
        alert("Invalid");
        this.setState({});
      }
    )


  // let data={
  //   "senderId" : localStorage.getItem('id'),
  //   "receiverId" : localStorage.getItem('otherUserId'),
  //   "message": document.getElementById('sendChatMessage').value,
  //   "senderHandle" :localStorage.getItem('userHandle'),
  //   "receiverHandle" :localStorage.getItem('otherUserHandle')
  // }
  // axios.defaults.withCredentials=true
  // axios.post('/messages/createChat',data)
  // .then((response)=>{
  //   console.log('create cht resp',response.data)
  //   if(localStorage.getItem('chats')==null)
  //     localStorage.setItem('chats',response.data._id)
  //   else
  //     localStorage.setItem('chats',localStorage.getItem('chats')+","+response.data._id)
  //   window.location.reload()
  // })
  // .catch((err)=>{
  //   console.log('err create chat',err)
  // })
}
  return (
    <span>
      <Button color="success" onClick={toggle}>Send Message</Button>
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

class MessageCard extends React.Component{

  render() {
      console.log(this.props.chatList);

      return(
        <div className = "MessagesCard">
          {this.props.chatList.map(chat => {
            return(
                <div className="Messages-Card-indi"> {/*href="/chat"*/}
                <div>
                    <div className="Messages-Image">
                      <br/>
                      {/*<img className="Messagesimage" src={_id.image}/>*/}
                    </div>
                    <div className="Messages-Card-Body">
                      <br/>
                      <div className="Messages-Card-Body-Content">
                        <SendMessageModal chat_id={chat._id} receiver_id={chat.users[0] == localStorage.getItem('id')? chat.users[1]: chat.users[0]}/>
                        <h5 className="Messages-Card-Body-Name"></h5>
                        <p className="Messages-Card-Body-Handle">{
                          chat.userHandles[0] == localStorage.getItem('userHandle')? chat.userHandles[1]: chat.userHandles[0]
                        }</p>
                        <p className="Messages-Card-Body-Date">{/*{messageList.date}*/}</p>
                        <Button color="danger"><p>View Chat</p></Button>
                      </div>
                      <br/>
                    </div>
                </div>
              </div>
             )
           })}
        </div>
      )
    }
}

class Messages extends React.Component {

  constructor(props) {
    super(props)
      this.state = {
        chatList: []
      };

  }

  componentWillMount(){
    let data = {
      chats: localStorage.getItem('chats')
      // chats: "5de48e956528003d3887b7b3,5de491e4aff08e0c8cdab48e"
    }
    axios.defaults.withCredentials=true
    axios.post('/messages/getAllChats', data)
      .then((response) => {
          console.log('response ok',response)
          console.log("All Chats:", response.data);

          if(response.data=="error")
          {
              alert("Invalid credentials");
          }

          this.setState({chatList: response.data}, ()=>{
            console.log(this.state.chatList);
          });

      })
      .catch (response => {
          alert("Invalid");
          this.setState({});
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
          <MessageCard chatList={this.state.chatList}/>
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
