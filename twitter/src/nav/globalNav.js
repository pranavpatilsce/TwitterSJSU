import React, { useState } from 'react';
import {Button, Modal, Col, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { Media } from 'reactstrap';
//import logo from '../../svg/logo.svg';
import './globalNav.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Bird from '../svg/twitterBird.svg';
import Pranav from '../svg/Pranav.jpeg';
import ImageUploader from '../svg/imageUpload.svg';


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

  return (
    <div>
      <Button color="secondary" onClick={toggle}>Tweet</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="Tweet-Modal-Header" toggle={toggle}></ModalHeader>
        <ModalBody className="Tweet-Modal-Body">
          <div className="tweet">
            <div className="tweet-image">
                <img src={Pranav}/>
            </div>
            <div className="tweet-body">
                <Input className="tweet-body-text" type="textarea" maxlength="280" placeholder="What's happening?" onKeyDown={searchHandler}></Input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="Tweet-Modal-Footer">

          <div class="image-upload">
            <label for="file-input">
                <img src={ImageUploader}/>
            </label>
            <input id="file-input" type="file" onChange={Navigation.onImageHandler}/>
          </div>
          <Button color="primary" onClick={toggle}>Tweet</Button>{' '}
          {/*<Button color="secondary" onClick={toggle}>Cancel</Button>*/}
        </ModalFooter>
      </Modal>
    </div>
  );
}

class Navigation extends React.Component {

  onImageHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  render(){

    return(
      <div className="App-header">

        <div className="Button-Padding">
          <a><img src={Bird}/></a>
        </div>

        <div className="Button-Padding">
          <Button>Home</Button>
        </div>

        <div className="Button-Padding">
          <Button>Profile</Button>
        </div>

        <div className="Button-Padding">
          <Button>Messages</Button>
        </div>

        <div className="Button-Padding">
          <Button>List</Button>
        </div>

        <div className="Button-Padding">
          <Button>Profile</Button>
        </div>

        <div className="Button-Padding">
          <ModalExample />
        </div>

      </div>
    )
  }
}

export default Navigation;
