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

let dispTweet=null;

class Tweet extends React.Component{

    constructor(props) {
      super(props);

      this.state = {
        tweetId: true,
        name: null,
        avatar: null,
        email: null
      };
    }


    render() {
      const otherTweets = [
        {
          tweetId: "12345",
          tweet: "CMPE273 tweet",
          time: "02:16:57",
          date: "Jul 23 2005",
          retweets: 0,
          replies: [],
          likes: 0,
          tweetHash: ["#hashtag", "#hashtagTwo"],
          likedBy: ["Pranav", "Nachiket"],
          type: "Original",
          name: "Mukesh Mogal",
          handle: "@handle",
          image: Mukesh
        },{
          tweetId: "123456",
          tweet: "CMPE273 tweet",
          time: "02:16:57",
          date: "Jul 23 2005",
          retweets: 0,
          replies: [],
          likes: 0,
          tweetHash: ["#hashtag", "#hashtagTwo"],
          likedBy: ["Pranav", "Nachiket"],
          type: "Original",
          name: "Kalyani Deshmukh",
          handle: "@handle2",
          image: Kalyani
        },{
          tweetId: "123457",
          tweet: "CMPE273 tweet",
          time: "02:16:57",
          date: "Jul 23 2005",
          retweets: 0,
          replies: [],
          likes: 0,
          tweetHash: ["#hashtag", "#hashtagTwo"],
          likedBy: ["Pranav", "Nachiket"],
          type: "Original",
          name: "Kartik Ulmarkar",
          handle: "@handle3",
          image: Kartik
        }
      ];
      let data = '5de03cd0b5ad6906843d79d2';
      let token=localStorage.getItem('bearer-token');
      axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.get('http://10.0.0.94:3001/profile/getAllTweets/5de03cd0b5ad6906843d79d2', {params:{}, mode:'no-cors'})
        .then((response) => {
            console.log('response ok',response)
        })
        .catch(()=>{console.log('error')})
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
                      <p className="Tweet-Body-Handle">{twt.handle}</p>
                      <p className="Tweet-Body-Date">{twt.date}</p>
                    </div>
                    <div>
                      <p className="Tweet-Body-Text">{twt.tweet}</p>
                    </div>
                    <div className="Tweet-Body-Panel">
                      <button className="Tweet-Body-Panel-Comment" ><img src={comment}/></button>
                      <button className="Tweet-Body-Panel-ReTweet" ><img src={retweet}/></button>
                      <button className="Tweet-Body-Panel-Like" ><img src={like}/></button>
                      <button className="Tweet-Body-Panel-Bookmark" ><img src={bookmark}/></button>
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
