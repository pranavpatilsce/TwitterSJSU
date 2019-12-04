import React, { useState } from 'react';
import {Button, Modal, Col, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { Media } from 'reactstrap';
//import logo from '../../svg/logo.svg';
import './globalNav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Bird from '../svg/twitterBird.svg';
import Pranav from '../svg/Pranav.jpeg';
import ImageUploader from '../svg/imageUpload.svg';
import {Redirect} from 'react-router';


let tweet=null
let reDirect = ""
let file = null
let redirectVar = null;

const ModalExample = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const searchHandler = (e) => {
    if (e.key === 'Enter') {
      alert('works');
    }
  }

  const onImageHandler = event => {

    file =  event.target.files[0]
    console.log('Files is------------------> ',file)
  }

  const tweetBodyChangeHandler=(e)=>{
    console.log(e.target.value);
    tweet=e.target.value;
  }
  const sendTweet=()=>{
    let data = {tweet:tweet, id:localStorage.getItem('id'), name:localStorage.getItem('name'),userHandle:localStorage.getItem('userHandle')};
    console.log('State Value isss----------->',file)
    const formData = new FormData()
    formData.append('tweetimg',file)
    formData.append('tweet',data.tweet)
    formData.append('id',data.id)
    formData.append('name',data.name)
    formData.append('userHandle',data.userHandle)

      let token=localStorage.getItem('bearer-token');
      axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      let config={headers:{'Content-Type':'multipart/form-data'}}
      axios.post('/users/tweet',formData,config)
        .then((response) => {
            console.log('response ok',response)
            window.location.reload()
        })
        .catch(()=>{console.log('error')})
  }
  return (
    <div>
      <Button className="TweetNavButton" onClick={toggle}>Tweet</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="Tweet-Modal-Header" toggle={toggle}></ModalHeader>
        <ModalBody className="Tweet-Modal-Body">
          <div className="tweet">
            <div className="tweet-image">
                <img src={Pranav}/>
            </div>
            <div className="tweet-body">
                <Input className="tweet-body-text" type="textarea" onChange={tweetBodyChangeHandler.bind(this)} maxlength="280" placeholder="What's happening?" onKeyDown={searchHandler}></Input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="Tweet-Modal-Footer">

          <div class="image-upload">
            <label for="file-input">
                <img src={ImageUploader}/>
            </label>
            <input id="file-input" type="file" onChange={onImageHandler}/>
          </div>
          <Button color="primary" onClick={sendTweet.bind(this)}>Tweet</Button>{' '}
          {/*<Button color="secondary" onClick={toggle}>Cancel</Button>*/}
        </ModalFooter>
      </Modal>
    </div>
  );
}

class Navigation extends React.Component {



  logoutHandler = () =>{
    localStorage.clear();

  }



  render(){

    if(!localStorage.getItem('email')){
        redirectVar = <Redirect to= "/"/>
    }

    return(
      <div>
        {redirectVar}
        {reDirect}
      <div className="App-header">

        <div className="Button-Padding">
          <a><img src={Bird}/></a>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton NavButton3" href="/home">Home</Button>
        </div>

        <div className="Button-Padding">

          <Button className="NavButton NavButton3" href="/bookmarks">Bookmarks</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton NavButton3" href="/messages">Messages</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton NavButton3" href='/listPage'>Lists</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton NavButton3" href="/profile">Profile</Button>
        </div>

        <div className="Button-Padding">
          <Button className="NavButton NavButton3" href="/dashboard">DashBoard</Button>
        </div>

        <div className="Button-Padding">
          <ModalExample />
        </div>

        <div className="Button-Padding">
          <Button className="NavButton NavButton3" href="/" onClick = {this.logoutHandler.bind(this)}>Logout</Button>
        </div>
      </div>
      </div>
    )
  }
}

export default Navigation;
