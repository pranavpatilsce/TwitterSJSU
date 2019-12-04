import React, {useState} from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';
import logo from '../../svg/logo.svg';
import '../../pages/home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../../nav/globalNav.js';
import RightSide from '../../components/search/search.js';

import Pranav from '../../svg/Pranav.jpeg';
import Kalyani from '../../svg/Kalyani.jpeg';
import Mukesh from '../../svg/Mukesh.jpeg';
import Kartik from '../../svg/Kartik.png';

import like from '../../svg/like.jpeg';
import retweet from '../../svg/retweet.jpeg';
import comment from '../../svg/comment.jpeg';
import bookmark from '../../svg/bookmark.jpeg';
import classnames from 'classnames';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import {Redirect} from 'react-router'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, NavLink, Nav, NavItem, TabContent, TabPane
} from 'reactstrap';

let allListsArr=[], dispTweets,listName, listDesc, listMembers, ownedLists=null, subscribedLists=null, memberLists=null;
let redirectToViewFlag=false, redirectToView=null, listTweets=null;
class ShowUserLists extends React.Component{

    subscribeList=(members, listId)=>{
        localStorage.setItem('listId',JSON.stringify(listId))
        let data={id: localStorage.getItem('id'),userHandle:localStorage.getItem('otherUserHandle'), listId:listId}
        // let data={id:"5de2f6f76156b960fccd9e01"}
        console.log('set subc data',data)
        axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
        axios.post('http://10.0.0.30:3001/member/setSubscriptions',data)
          .then((response) => {
              console.log('setSubscribers response',response.data)
              if(response.data!='exists')
                alert("Subscribed!")
             else if(response.data=='exists')
                alert('List already subscribed')
              this.setState({})
          })
          .catch(()=>{console.log('error in message lists')})
    }
    constructor(props) {
      super(props);
      let data = {userHandle:localStorage.getItem('otherUserHandle')};
      let token=localStorage.getItem('bearer-token');
      axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.post('/list/getList',data)
        .then((response) => {
            console.log('response allListsArr',response.data)
            allListsArr=response.data['lists'];
            ownedLists=allListsArr.map((twt, index) =>
                <div className="tweetCard-indi">
                  <div className="Tweet-Image">
                    <br/>
                  </div>
                  <div className="Tweet-Body">
                    <br/>
                    <div className="Tweet-Body-Content">
                      <h4 className="Tweet-Body-Name">{twt.listName}</h4>
                    </div>
                    <div>
                      <p className="Tweet-Body-Text">{twt.description}</p>
                    </div>
                    <div>
                      <p className="Tweet-Body-Text">Members: {twt.members.join(',')}</p>
                    </div>
                    <div className="Tweet-Body-Panel">
                      <Button onClick={this.subscribeList.bind(this,twt.members,twt.listId)}>Subscribe</Button>
                      <br/>
                      <br/>
                      <br/>
                    </div>
                  </div>
                </div>
            )
            this.setState({})
        })
        .catch(()=>{console.log('error in getting lists')})
    }

    render() {
      return(
        <div className = "tweetCard">
            {redirectToView}
            {ownedLists}
        </div>
      );
    }
  }

export default ShowUserLists;