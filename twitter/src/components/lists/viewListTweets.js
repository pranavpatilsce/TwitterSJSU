import React, {useState} from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';
import logo from '../../svg/logo.svg';
import '../../pages/home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../../nav/globalNav.js';
import RightSide from '../search/search.js';

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

let allListsArr=[], dispTweets,listName, listDesc, listMembers, ownedLists=null, redirectVar=null;
  
let redirectToViewFlag=false, redirectToView=null, allListTweets=null, displayTweets=[];


class ViewListTweets extends React.Component{
    constructor(props) {
      super(props)
      let allListTweetsArr=JSON.parse(localStorage.getItem('listTweets'));
      console.log('allListTweetsArr', allListTweetsArr)
      let count=0;
      allListTweets=allListTweetsArr.map((twt, index) =>{
        console.log('twt deets', twt)
        let name=twt['name']
        let tweetDeets=twt['tweets']
        displayTweets[count++]=tweetDeets.map((ele)=>{
          return(
            <div className="tweetCard-indi">
                    <div className="Tweet-Image">
                      <br/>
                      <img className="image" src={ele.image}/>
                    </div>
                    <div className="Tweet-Body">
                      <br/>
                      <div className="Tweet-Body-Content">
                        <h5 className="Tweet-Body-Name">{name}</h5>
                        <p className="Tweet-Body-Handle">{twt.userHandle}</p>
                        <p className="Tweet-Body-Date">{ele.date}</p>
                      </div>
                      <div>
                        <p className="Tweet-Body-Text">{ele.tweet}</p>
                      </div>
                      <div className="Tweet-Body-Panel">
                        <button className="Tweet-Body-Panel-Comment" onClick={this.commentTweet}><img src={comment}/><span id="likec" className="likeCount">{ele.replies.length}</span></button>
                        <button className="Tweet-Body-Panel-ReTweet" onClick={this.retweetTweet}><img src={retweet}/><span id="likec" className="likeCount">{ele.retweets}</span></button>
                        <button className="Tweet-Body-Panel-Like" onClick={this.likeTweet}><img src={like}/><span id="likec" className="likeCount">{ele.likes}</span></button>
                        <button className="Tweet-Body-Panel-Bookmark" onClick={this.bookmarkTweet}><img src={bookmark}/></button>
                        <br/>
                        <br/>
                        <br/>
                      </div>
                    </div>
                  </div>
          )
        })
      }
      )
      this.setState({})
    }
    render() {
      if(!localStorage.getItem('email')){
        redirectVar = <Redirect to= "/"/>
    }
      return(
        <div className = "tweetCard">
          {redirectVar}
          {displayTweets}
        </div>
      );
    }
  }

export default ViewListTweets;