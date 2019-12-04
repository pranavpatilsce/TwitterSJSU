import React, { useState } from 'react';
import { Button } from 'reactstrap';
import './profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../../nav/globalNav.js';
import RightSide from '../search/search.js';
import Pranav from '../../svg/Pranav.jpeg';
import Wallpaper from '../../svg/wallpaper.jpeg';

import Tweet from '../../pages/home/userTweet.js';
import BackButton from '../../svg/backProfile.png';
import like from '../../svg/like.jpeg';
import retweet from '../../svg/retweet.jpeg';
import comment from '../../svg/comment.jpeg';
//import option from '../../svg/option.jpeg';
import bookmark from '../../svg/bookmark.jpeg';
import Location from '../../svg/location.png';
import Calendar from '../../svg/calendar.png';
import Birthday from '../../svg/birthday.jpeg';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import {Redirect} from 'react-router';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
let userTweets = null;
let followers = null;
let following = null;
let liked = null;
let bookmarked = null;
let retweeted = null;
let redirectVar=null;

class NoMedia extends React.Component {
    render() {
        return (
            <div>
                <h5 className="MainAccouncement-Media">You haven't Tweeted any photos or videos yet</h5>
                <h6 className="SubAccouncement-Media">When you send with photos or videos in them, they will show up here.</h6>
                <Button className="buttonNoTweet"> Tweet a photo or video</Button>
            </div>
        )
    }
}

class NoLikes extends React.Component {
    render() {
        return (
            <div>
                <h5 className="MainAccouncement-Likes">You don't have any likes yet</h5>
                <h6 className="SubAccouncement-Likes">Tap the heart on any Tweet to show it some love. When you do, it'll show up here.</h6>
            </div>
        )
    }
}

const Tabs = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div>
            {alert('tabs')}
            <Nav tabs className="ProfileTabsDiv">
                <NavItem className="ProfileTabs">
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Tweets
          </NavLink>
                </NavItem>
                <NavItem className="ProfileTabs">
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Tweets & replies
          </NavLink>
                </NavItem>
                <NavItem className="ProfileTabs">
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                    >
                        Media
          </NavLink>
                </NavItem>
                <NavItem className="ProfileTabs">
                    <NavLink
                        className={classnames({ active: activeTab === '4' })}
                        onClick={() => { toggle('4'); }}
                    >
                        Likes
          </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <div className="Profile-Profile-Card">
                        {userTweets}
                    </div>
                </TabPane>
                <TabPane tabId="2">
                    <div className="Profile-Profile-Card">
                        <Tweet />
                    </div>
                </TabPane>
                <TabPane tabId="3">
                    <NoMedia />
                </TabPane>
                <TabPane tabId="4">
                    <NoLikes />
                </TabPane>
            </TabContent>
        </div>
    );
}

class ProfileTopBar extends React.Component {

    render() {
        return (
            <div className="ProfileBar">
                <div>
                    <Button className="BarTitle"> <h3>{localStorage.getItem('otherUserHandle')}</h3></Button>
                </div>
                <div>
                    <Button className="BackButton"><img top width="69%" src={BackButton} /></Button>
                </div>
            </div>
        )
    }

}
let bio = null, ownTweets = null, bdate = null
class ProfileCard extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            profiledata: {}
        }

    }

    follow = (type) => {

        // let data={initiateId:localStorage.getItem("id"),tobeFollowedID:tobefollowdid}
        axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
        console.log('type isssssssssss', type)
        if (type == 'followers') {
            axios.get('/dashboard/getFollowers/' + localStorage.getItem('id'))
                .then((response) => {
                    console.log('Success follow operation, going to reload !!!', response.data)

                    followers = response.data.map((follower, index) => {
                        return (
                            <div className="tweetCard-indi">
                                <div className="Tweet-Image">
                                    <br />
                                    <img className="image" src={follower.image} />
                                </div>
                                <div className="Tweet-Body">
                                    <br />
                                    <div className="Tweet-Body-Content">
                                        <h5 className="Tweet-Body-Name">{follower.name}</h5>
                                        <p className="Tweet-Body-Handle">{follower.userHandle}</p>
                                    </div>

                                </div>
                            </div>
                        )
                    }
                    )
                    console.log('usertweeetssssssssssssssssssssssssssssssssss------------------>', userTweets)
                    //   this.setState({profiledata:response.data})
                    following = null;
                    userTweets = null
                    this.setState({})

                })
                .catch(() => { console.log('error') })
        }

        else if (type == 'following') {
            axios.get('/dashboard/getFollowing/' + localStorage.getItem('id'))
                .then((response) => {
                    console.log('Success following operation, going to reload !!!', response.data)

                    following = response.data.map((follower, index) => {
                        return (
                            <div className="tweetCard-indi">
                                <div className="Tweet-Image">
                                    <br />
                                    <img className="image" src={follower.image} />
                                </div>
                                <div className="Tweet-Body">
                                    <br />
                                    <div className="Tweet-Body-Content">
                                        <h5 className="Tweet-Body-Name">{follower.name}</h5>
                                        <p className="Tweet-Body-Handle">{follower.userHandle}</p>
                                    </div>

                                </div>
                            </div>
                        )
                    }
                    )
                    console.log('usertweeetssssssssssssssssssssssssssssssssss------------------>', userTweets)
                    //   this.setState({profiledata:response.data})
                    followers = null
                    userTweets = null
                    this.setState({})

                })
                .catch(() => { console.log('error') })
        }

        else if (type == 'bookmarked') {
            axios.get('/dashboard/getBookmarkedTweets/' + localStorage.getItem('id'))
                .then((response) => {
                    console.log('Success getBookmarkedTweets operation, going to reload !!!', response.data)
                    userTweets = response.data.map((twt, index) => {
                        return (
                            <div className="tweetCard-indi">
                                <div className="Tweet-Image">
                                    <br />
                                    <img className="image" src={twt.image} />
                                </div>
                                <div className="Tweet-Body">
                                    <br />
                                    <div className="Tweet-Body-Content">
                                        <h5 className="Tweet-Body-Name">{twt.name}</h5>
                                        <p className="Tweet-Body-Handle">{twt.userHandle}</p>
                                        <p className="Tweet-Body-Date">{twt.date}</p>
                                    </div>
                                    <div>
                                        <p className="Tweet-Body-Text">{twt.tweet}</p>
                                    </div>
                                    <div className="Tweet-Body-Panel">
                                        <button className="Tweet-Body-Panel-Comment" ><img src={comment} /></button>
                                        <button className="Tweet-Body-Panel-ReTweet" ><img src={retweet} /></button>
                                        <button className="Tweet-Body-Panel-Like" ><img src={like} /></button>
                                        <button className="Tweet-Body-Panel-Bookmark" ><img src={bookmark} /></button>
                                        <br />
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )
                    console.log('usertweeetssssssssssssssssssssssssssssssssss------------------>', userTweets)
                    //   this.setState({profiledata:response.data})
                    followers = null
                    following = null
                    this.setState({})





                })
                .catch(() => { console.log('error') })

        }

        else if (type == 'liked') {
            axios.get('/dashboard/getLikedTweets/' + localStorage.getItem('id'))
                .then((response) => {
                    console.log('Success getLikedTweets operation, going to reload !!!', response.data)
                    userTweets = response.data.map((twt, index) => {
                        return (
                            <div className="tweetCard-indi">
                                <div className="Tweet-Image">
                                    <br />
                                    <img className="image" src={twt.image} />
                                </div>
                                <div className="Tweet-Body">
                                    <br />
                                    <div className="Tweet-Body-Content">
                                        <h5 className="Tweet-Body-Name">{twt.name}</h5>
                                        <p className="Tweet-Body-Handle">{twt.userHandle}</p>
                                        <p className="Tweet-Body-Date">{twt.date}</p>
                                    </div>
                                    <div>
                                        <p className="Tweet-Body-Text">{twt.tweet}</p>
                                    </div>
                                    <div className="Tweet-Body-Panel">
                                        <button className="Tweet-Body-Panel-Comment" ><img src={comment} /></button>
                                        <button className="Tweet-Body-Panel-ReTweet" ><img src={retweet} /></button>
                                        <button className="Tweet-Body-Panel-Like" ><img src={like} /></button>
                                        <button className="Tweet-Body-Panel-Bookmark" ><img src={bookmark} /></button>
                                        <br />
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )
                    console.log('usertweeetssssssssssssssssssssssssssssssssss------------------>', userTweets)
                    //   this.setState({profiledata:response.data})
                    followers = null
                    following = null
                    this.setState({})





                })
                .catch(() => { console.log('error') })

        }

        else {

        }
    }

    // following = ()=>{
    //   let data={id:localStorage.getItem("id"),unfollowId:tobeunfollowdid}
    //   axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
    //   axios.post('/users/unfollow', data)
    //     .then((response) => {
    //       console.log('Success unfollow operation, going to reload !!!',response.data)
    //       window.location.reload();
    //     })
    //     .catch(()=>{console.log('error')})

    // }

    componentWillMount = () => {
        console.log('User handle loaded!!!!', localStorage.getItem('userHandle'))
        let data = { userHandle: localStorage.getItem('userHandle') };
        let token = localStorage.getItem('bearer-token');
        // alert('asd')
        axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
        axios.post('/profile/getProfileKafka', data)
            .then((response) => {
                console.log('response is getprofile !!!', response.data)
                bio = response.data.bio
                ownTweets = response.data[0].tweets
                bdate = response.data.bdate
                console.log('response ok', response.data[0].tweets)
                userTweets = ownTweets.map((twt, index) => {
                    return (
                        <div className="tweetCard-indi">
                            <div className="Tweet-Image">
                                <br />
                                <img className="image" src={twt.image} />
                            </div>
                            <div className="Tweet-Body">
                                <br />
                                <div className="Tweet-Body-Content">
                                    <h5 className="Tweet-Body-Name">{twt.name}</h5>
                                    <p className="Tweet-Body-Handle">{twt.userHandle}</p>
                                    <p className="Tweet-Body-Date">{twt.date}</p>
                                </div>
                                <div>
                                    <p className="Tweet-Body-Text">{twt.tweet}</p>
                                </div>
                                <div className="Tweet-Body-Panel">
                                    <button className="Tweet-Body-Panel-Comment" ><img src={comment} /></button>
                                    <button className="Tweet-Body-Panel-ReTweet" ><img src={retweet} /></button>
                                    <button className="Tweet-Body-Panel-Like" ><img src={like} /></button>
                                    <button className="Tweet-Body-Panel-Bookmark" ><img src={bookmark} /></button>
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>
                    )
                }
                )
                console.log('usertweeetssssssssssssssssssssssssssssssssss------------------>', userTweets)
                // this.setState({ profiledata: response.data })
                this.setState({})
            })
            .catch(() => { console.log('error') })
    }

    render() {
        console.log('This profiledata state is!!!!!!!!!!!!!!!!!!!!!!!!!!!', this.state.profiledata)
        console.log('This followers data', followers, 'follwing\n', following)

        return (
            <div className="ProfileCard-Parent">
                <div className="ProfileCard-Wallpaper">
                    <img src={Wallpaper} />
                </div>
                <div className="ProfileCard-Image">
                    <img className="image" src={Pranav} />
                </div>
               
                <div className="overall">
                    <div>
                        <h4 className="ProfileName">{localStorage.getItem('name') == undefined ? "" : localStorage.getItem('name')}</h4>
                        <p className="ProfileHandle">{localStorage.getItem('userHandle') == undefined ? "" : localStorage.getItem('userHandle')}</p>
                    </div>
                    <div className="ProfileBio">
                        <p>{localStorage.getItem("bio")}</p>
                    </div>
                  
                    <div>

                        <span> </span> <button className="btn btn-primary" onClick={() => { this.follow('followers') }} >Followers</button><span> </span>
                        <button className="btn btn-primary" onClick={() => { this.follow('following') }}>Following</button><span> </span>
                        <button className="btn btn-primary" onClick={() => { this.follow('bookmarked') }}>View BookMarked</button><span> </span>
                        <button className="btn btn-primary" onClick={() => { this.follow('liked') }} >View Liked</button><span> </span>
                    </div>
                </div>

                <div>
                    {/* <Tabs/> */}
                    {followers}
                </div>
                <div>
                    {/* <Tabs/> */}
                    {following}
                </div>
                <div>
                    {/* <Tabs/> */}
                    {userTweets}
                </div>
            </div>
        )
    }

}

class ProfileTabs extends React.Component {

    render() {
        return (
            <div>
                <p> yo </p>
            </div>
        )
    }

}

class dashboardProfile extends React.Component {

    render() {
        if(!localStorage.getItem('email')){
            redirectVar = <Redirect to= "/"/>
        }
        return (

            <div className="Profile">
                {redirectVar}
                <div className="Profile-Navigation">
                    <Navigation />
                </div>

                <div>
                    <ProfileCard />
                </div>
                <div className="Profile-RightSide">
                    <RightSide />
                </div>
            </div>
        )
    }

}

export default dashboardProfile;
