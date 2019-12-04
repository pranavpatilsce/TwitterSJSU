import React, {useState} from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';
import logo from '../../svg/logo.svg';
import '../../pages/home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../../nav/globalNav.js';
import RightSide from '../../components/search/search.js';

import classnames from 'classnames';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import {Redirect} from 'react-router'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, NavLink, Nav, NavItem, TabContent, TabPane
} from 'reactstrap';

let allListsArr=[], dispTweets,listName, listDesc, listMembers, ownedLists=null, subscribedLists=null, memberLists=null, redirectVar=null;

const Tabs = (props) => {
    const [activeTab, setActiveTab] = useState('1');
  
    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }
  
    return (
      <div>
        <Nav tabs className="ProfileTabsDiv">
          <NavItem  className="ProfileTabs">
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >
              Owned
            </NavLink>
          </NavItem>
          <NavItem  className="ProfileTabs">
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              Subscribed
            </NavLink>
          </NavItem>
          <NavItem  className="ProfileTabs">
            <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => { toggle('3'); }}
              >
              Member
            </NavLink>
          </NavItem>
        </Nav>
  
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className = "">
                {ownedLists}
                </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="">
                {subscribedLists}
            </div>
          </TabPane>
          <TabPane tabId="3">
            <div className="">
                {memberLists}
            </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
  
const CreateListModal = (props) => {
    const {
        buttonLabel,
        className
      } = props;
    
      const [modal, setModal] = useState(false);
    
      const toggle = () => setModal(!modal);
    
      const createList=()=>{
          let mem=listMembers.replace(/ /g,'').split(',')
          // alert(mem)
        let data = {id:localStorage.getItem('id'),userHandle:localStorage.getItem('userHandle'), listName:listName, description:listDesc, members:mem};
        console.log(data)
          let token=localStorage.getItem('bearer-token');
          axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
          axios.post('/list/createList',data)
            .then((response) => {
                console.log('response of create list',response)
                // alert()
                if(response.data)
                {window.location.reload()}
            })
            .catch(()=>{console.log('error')})
      }
      const listNameHandler=(e)=>{
        listName=e.target.value
      }
      const listDescHandler=(e)=>{
          listDesc=e.target.value
     }
     const listMemberHandlesHandler=(e)=>{
        listMembers=e.target.value
     }
      return (
        <div>
          <Button color="secondary" onClick={toggle}>Create List</Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader className="Tweet-Modal-Header" toggle={toggle}>Create List</ModalHeader>
            <ModalBody className="Tweet-Modal-Body">
              <div className="tweet">
                <div className="tweet-body">
                    <Input className="tweet-body-text" type="textarea"  maxlength="480" placeholder="Enter List Name" onChange={listNameHandler.bind(this)}></Input>
                </div>
              </div>
              <div className="tweet">
                <div className="tweet-body">
                    <Input className="tweet-body-text" type="textarea"  maxlength="480" placeholder="Enter List Description" onChange={listDescHandler.bind(this)}></Input>
                </div>
              </div>
              <div className="tweet">
                <div className="tweet-body">
                    <Input className="tweet-body-text" type="textarea"  maxlength="480" placeholder="Enter Member Handles" onChange={listMemberHandlesHandler.bind(this)}></Input>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="Tweet-Modal-Footer">
              <Button color="primary" onClick={createList.bind(this)}>Create</Button>{' '}
              {/*<Button color="secondary" onClick={toggle}>Cancel</Button>*/}
            </ModalFooter>
          </Modal>
        </div>
      );
  }
let redirectToViewFlag=false, redirectToView=null, listTweets=null;
class List extends React.Component{

    viewListTweets=(members, listName)=>{
        localStorage.setItem('listName',JSON.stringify(listName))
        console.log(members)
        let data={members:members}
        axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
        axios.post('/list/getListTweets',data)
          .then((response) => {
              console.log('getlisttweets response',response.data)
              listTweets=response.data
              localStorage.setItem('listTweets',JSON.stringify(listTweets))
              redirectToViewFlag=true;
              this.setState({})
          })
          .catch(()=>{console.log('error in message lists')})
    }
    constructor(props) {
      super(props);
      let data = {userHandle:localStorage.getItem('userHandle')};
      let token=localStorage.getItem('bearer-token');
      axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.post('/member/getMemberships',data)
        .then((response) => {
            // alert('success')
            console.log('response allMembersArr',response.data)
            allListsArr=response.data['memberships'];
            memberLists=allListsArr.map((twt, index) =>
                <div className="tweetCard-indi">
                  <div className="Tweet-Image">
                    <br/>
                  </div>
                  <div className="Tweet-Body">
                    <br/>
                    <div className="Tweet-Body-Content">
                      <h4 className="Tweet-Body-Name">{twt.listName} | {twt.listOwner}</h4>
                    </div>
                    <div>
                      <p className="Tweet-Body-Text">{twt.description}</p>
                    </div>
                    <div>
                      <p className="Tweet-Body-Text">Members: {twt.members.join(',')}</p>
                    </div>
                    <div className="Tweet-Body-Panel">
                      <Button onClick={this.viewListTweets.bind(this,twt.members,twt.listName)}>View Tweets</Button>
                      <br/>
                      <br/>
                      <br/>
                    </div>
                  </div>
                </div>
            )
        })
        .catch(()=>{console.log('error in getting subscriptions')})
      axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.post('/member/getSubscriptions',data)
        .then((response) => {
            // alert('success')
            console.log('response allSubscribedArr',response.data)
            allListsArr=response.data['subscriptions'];
            subscribedLists=allListsArr.map((twt, index) =>
                <div className="tweetCard-indi">
                  <div className="Tweet-Image">
                    <br/>
                  </div>
                  <div className="Tweet-Body">
                    <br/>
                    <div className="Tweet-Body-Content">
                      <h4 className="Tweet-Body-Name">{twt.listName} | {twt.ownerUserHandle}</h4>
                    </div>
                    <div>
                      <p className="Tweet-Body-Text">{twt.description}</p>
                    </div>
                    <div>
                      <p className="Tweet-Body-Text">Members: {twt.members.join(',')}</p>
                    </div>
                    <div className="Tweet-Body-Panel">
                      <Button onClick={this.viewListTweets.bind(this,twt.members,twt.listName)}>View Tweets</Button>
                      <br/>
                      <br/>
                      <br/>
                    </div>
                  </div>
                </div>
            )
        })
        .catch(()=>{console.log('error in getting subscriptions')})
      axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.post('/list/getList',data)
        .then((response) => {
            // alert('success')
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
                      <Button onClick={this.viewListTweets.bind(this,twt.members,twt.listName)}>View Tweets</Button>
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
     if(redirectToViewFlag)
     {
        redirectToView=<Redirect to={{pathname:'/viewListTweetsPage',
        state:{listTweets:listTweets}}}/> 
        console.log('broo', JSON.stringify(listTweets))
        redirectToViewFlag=false;
     }
     if(!localStorage.getItem('email')){
      redirectVar = <Redirect to= "/"/>
  }
      return(
        <div className = "tweetCard">
          {redirectVar}
            {redirectToView}
            <CreateListModal/>
            <Tabs/>
        </div>
      );
    }
  }

export default List;