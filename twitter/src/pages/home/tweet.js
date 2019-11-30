import React from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';
import logo from '../../svg/logo.svg';
import './home.css';
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
//import option from '../../svg/option.jpeg';
import bookmark from '../../svg/bookmark.jpeg';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

let otherTweets=[];

class Tweet extends React.Component{

    constructor(props) {
      super(props);

      let data = '5de03cd0b5ad6906843d79d2';
      let token=localStorage.getItem('bearer-token');
      axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.get('http://localhost:3001/profile/getAllTweets/'+localStorage.getItem('id'), {params:{}, mode:'no-cors'})
        .then((response) => {
            // alert('success')
            console.log('response othertweets',response.data)
            otherTweets=response.data;
            this.setState({})
        })
        .catch(()=>{console.log('error')})
    }


    render() {
     
      return(
        <div className = "tweetCard">
            {otherTweets.map((twt, index) =>
                <div className="tweetCard-indi">
                  <div className="Tweet-Image">
                    <br/>
                    <img className="image" src={twt.image}/>
                  </div>
                  <div className="Tweet-Body">
                    <br/>
                    <div className="Tweet-Body-Content">
                      <h5 className="Tweet-Body-Name">{twt.name}</h5>
                      <p className="Tweet-Body-Handle">{twt.userHandle}</p>
                      <p className="Tweet-Body-Date">{twt.date}</p>
                    </div>
                    <div>
                      <p className="Tweet-Body-Text">{twt.tweet}</p>
                    </div>
                    <div className="Tweet-Body-Panel">
                      <button className="Tweet-Body-Panel-Comment" onClick={this.commentTweet}><img src={comment}/></button>
                      <button className="Tweet-Body-Panel-ReTweet" onClick={this.retweetTweet}><img src={retweet}/></button>
                      <button className="Tweet-Body-Panel-Like" onClick={this.likeTweet}><img src={like}/></button>
                      <button className="Tweet-Body-Panel-Bookmark" onClick={this.bookmarkTweet}><img src={bookmark}/></button>
                      <br/>
                      <br/>
                      <br/>
                    </div>
                  </div>
                </div>
            )}
        </div>
      );
    }
  }

export default Tweet;
