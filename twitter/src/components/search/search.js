import React from 'react';
import {Button} from 'reactstrap';
//import logo from '../../svg/logo.svg';
import './search.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Input } from 'reactstrap';
//import MagnifyingSearch from '../../svg/search_100px.svg';
import {Redirect} from 'react-router'
 
let searchHandler="", redirectFlag=false, redirectVar=null
let searchTweet=false;
class RightSide extends React.Component {
 searchHandler = (e) => {
   if (e.key === 'Enter') {
    redirectFlag=true;
    localStorage.removeItem('searchTweet')
    localStorage.removeItem('otherUserHandle')
    if(searchHandler.includes('#'))
    {
      localStorage.setItem('searchTweet',searchHandler)
      searchTweet=true
    }
    else
    {
      localStorage.setItem('otherUserHandle',searchHandler)
    }
     
     this.setState({})
   }
 }
 searchTextHandler=(e)=>{
   searchHandler=e.target.value
 }
 render(){
  if(!localStorage.getItem('email')){
    redirectVar = <Redirect to= "/"/>
}
   if(redirectFlag)
   {
     if(searchTweet)
     {
      redirectVar=<Redirect to="/showtweetsearch"/>
      redirectFlag=false;
      searchTweet = false;
     }
     else{
      redirectVar=<Redirect to="/otherProfilePage"/>
      redirectFlag=false;
      searchTweet = false;
     }
     
   }
   return(
     <div className="search-div">
       {redirectVar}
       <div>
         <Form>
         <FormGroup>
           <Input className="search-bar" type="text" name="address" placeholder="Search a trend or person" onChange={this.searchTextHandler.bind(this)} onKeyDown={this.searchHandler}></Input>
         </FormGroup>
         </Form>
         {/* <input type="text"> Search People or Trends </input>*/}
       </div>
 
     </div>
   )
 }
}
 
export default RightSide;
 


